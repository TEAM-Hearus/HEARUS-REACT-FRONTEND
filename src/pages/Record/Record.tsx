import { useState, useCallback, useEffect } from 'react';
import RecordHeader from '../../components/organisms/headers/RecordHeader/RecordHeader';
import { useSocket } from '../../hooks/useSocket';
import { useRecorder } from '../../hooks/useRecorder';
import styles from './Record.module.scss';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState('');
  const [currentCaption, setCurrentCaption] =
    useState('여기에 자막이 표시됩니다.');

  const onTransitionResult = useCallback((result: string) => {
    setRecognitionResult((prev) => prev + ' ' + result);
    setCurrentCaption(result);
  }, []);

  const socketRef = useSocket(onTransitionResult);

  const onAudioData = useCallback(
    (data: string) => {
      socketRef.current?.emit('transcription', data);
    },
    [socketRef],
  );

  const { startRecording, stopRecording } = useRecorder(onAudioData);

  const stopRecordingAndDisconnectSocket = useCallback(() => {
    stopRecording();
    socketRef.current?.disconnect();
  }, [stopRecording, socketRef]);

  useEffect(() => {
    setIsRecording(true);
    return () => {
      setIsRecording(false);
      stopRecordingAndDisconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecordingAndDisconnectSocket();
    }
  }, [isRecording]);

  return (
    <div className={styles.container}>
      <RecordHeader
        stopRecordingAndDisconnectSocket={stopRecordingAndDisconnectSocket}
      />
      <article className={styles.captionContainer}>{recognitionResult}</article>
      <section className={styles.smallSection}>{currentCaption}</section>
    </div>
  );
};

export default Record;
