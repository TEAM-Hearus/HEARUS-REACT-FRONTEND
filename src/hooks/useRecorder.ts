import { useRef } from 'react';
import { useAlert } from '../contexts/AlertContext';

export const useRecorder = (onAudioData: (data: string) => void) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  const { addAlert } = useAlert();

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
            onAudioData(base64EncodedData);
          } else {
            console.error(
              '[mediaRecorder]-[ondataavailable] ArrayBuffer is null',
            );
          }
        };
        reader.readAsArrayBuffer(event.data);
      }
    };

    mediaRecorderRef.current.start();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      initMediaRecorder(stream);

      intervalRef.current = setInterval(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        initMediaRecorder(stream);
      }, 3000);
    } catch (error) {
      addAlert(
        '마이크를 사용할 수 없습니다. 브라우저 설정을 확인해주세요.',
        'error',
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    mediaRecorderRef.current = null;
    streamRef.current = null;
    intervalRef.current = null;
  };

  return { startRecording, stopRecording };
};
