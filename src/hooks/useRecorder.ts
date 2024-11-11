import { useRef } from 'react';
import { useAlertStore } from '../store/useAlertStore';

export const useRecorder = (onAudioData: (data: string) => void) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const addAlert = useAlertStore((state) => state.addAlert);

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const options = { mimeType: 'audio/webm;codecs=opus' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start(3000);
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
    mediaRecorderRef.current = null;
    streamRef.current = null;
  };

  return { startRecording, stopRecording };
};
