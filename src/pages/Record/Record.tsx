import { useState, useCallback } from 'react';
import RecordHeader from '../../components/headers/RecordHeader/RecordHeader';
import styles from './Record.module.scss';
import { useSocket } from '../../hooks/useSocket';
import { useRecorder } from '../../hooks/useRecorder';

const Record = () => {
  const [recognitionResult, setRecognitionResult] = useState('');

  const onTransitionResult = useCallback((result: string) => {
    console.log('transitionResult: ', result);
    setRecognitionResult((prev) => prev + ' ' + result);
  }, []);

  const socketRef = useSocket(onTransitionResult);

  const onAudioData = useCallback(
    (data: string) => {
      socketRef.current?.emit('transcription', data);
    },
    [socketRef],
  );

  const { stopRecording } = useRecorder(onAudioData);

  const stopRecordingAndDisconnectSocket = useCallback(() => {
    stopRecording();
    socketRef.current?.disconnect();
  }, [stopRecording, socketRef]);

  return (
    <div className={styles.container}>
      <RecordHeader
        stopRecordingAndDisconnectSocket={stopRecordingAndDisconnectSocket}
      />
      <article className={styles.captionContainer}>{recognitionResult}</article>
    </div>
  );
};

export default Record;
