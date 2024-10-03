import { useState, useCallback, useEffect } from 'react';
import RecordHeader from '../../components/organisms/headers/RecordHeader/RecordHeader';
import { useSocket } from '../../hooks/useSocket';
import { useRecorder } from '../../hooks/useRecorder';
import styles from './Record.module.scss';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<string[]>([]);
  const [currentCaption, setCurrentCaption] =
    useState('여기에 자막이 표시됩니다.');

  const onTransitionResult = useCallback((result: string) => {
    setRecognitionResult((prev) => [...prev, result]);
    setCurrentCaption(result);
  }, []);

  const { socketRef, connectSocket, disconnectSocket } =
    useSocket(onTransitionResult);

  const onAudioData = useCallback(
    (data: string) => {
      socketRef.current?.emit('transcription', data);
    },
    [socketRef],
  );

  const { startRecording, stopRecording } = useRecorder(onAudioData);

  const stopRecordingAndDisconnectSocket = useCallback(() => {
    stopRecording();
    disconnectSocket();
  }, [stopRecording, disconnectSocket]);

  useEffect(() => {
    setIsRecording(true);
    connectSocket();
    return () => {
      setIsRecording(false);
      stopRecording();
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    <div className={styles.container}>
      <RecordHeader
        stopRecordingAndDisconnectSocket={stopRecordingAndDisconnectSocket}
        recognitionResult={recognitionResult}
      />
      <article className={styles.captionContainer}>
        {recognitionResult.join(' ')}
      </article>
      <section className={styles.smallSection}>{currentCaption}</section>
    </div>
  );
};

export default Record;
