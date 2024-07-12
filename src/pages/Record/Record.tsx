import { io, Socket } from 'socket.io-client';
import RecordHeader from '../../components/headers/RecordHeader/RecordHeader';
import styles from './Record.module.scss';
import SOCKETURL from '../../apis/record';
import { useEffect, useRef, useState } from 'react';

const Record = () => {
  const [recognitionResult, setRecognitionResult] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKETURL, {
      path: '/socket.io',
      transports: ['websocket'],
      extraHeaders: {
        'Sec-WebSocket-Extensions':
          'permessage-deflate; client_max_window_bits',
      },
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionAttempts: Infinity,
    });

    socketRef.current.on('connect', () => {
      console.log('socket connected');
      const lectureId = '668cceb8ebef2b4462de0fb5';
      socketRef.current?.emit('lectureId', lectureId);
    });

    socketRef.current.on('transitionResult', (result) => {
      console.log('transitionResult: ', result);
      setRecognitionResult((prev) => prev + ' ' + result);
    });

    // 녹음 시작
    startRecording();

    return () => {
      stopRecording();
      socketRef.current?.disconnect();
    };
  }, []);

  const initMediaRecorder = (stream: MediaStream) => {
    const options = { mimeType: 'audio/webm;codecs=opus' };
    mediaRecorderRef.current = new MediaRecorder(stream, options);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0 && event.data != null) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          if (arrayBuffer) {
            const base64EncodedData = btoa(
              String.fromCharCode(...new Uint8Array(arrayBuffer)),
            );
            socketRef.current?.emit('transcription', base64EncodedData);
          } else {
            console.error(
              '[mediaRecorder]-[ondataavailable] ArrayBuffer is null',
            );
          }
        };
        reader.readAsArrayBuffer(event.data);
      }
    };

    mediaRecorderRef.current.start(1000); // 1초마다 데이터 전송
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      initMediaRecorder(stream);

      // 5초마다 MediaRecorder 재시작
      intervalRef.current = setInterval(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        initMediaRecorder(stream);
      }, 5000);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleQuit = () => {
    // 녹음 중지
    stopRecording();
    // 소켓 연결 해제
    socketRef.current?.disconnect();
  };

  return (
    <div className={styles.container}>
      <RecordHeader handleQuit={handleQuit} />
      <article className={styles.captionContainer}>{recognitionResult}</article>
    </div>
  );
};

export default Record;
