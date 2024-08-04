import { useState, useCallback } from 'react';
import RecordHeader from '../../components/headers/RecordHeader/RecordHeader';
import styles from './Record.module.scss';
import { useSocket } from '../../hooks/useSocket';
import { useRecorder } from '../../hooks/useRecorder';
import Modal from '../../components/modals/modal/Madal';
import { useModalStore } from '../../store/useModalStore';

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

  const { openModal } = useModalStore();

  const handleQuit = useCallback(() => {
    stopRecording();
    socketRef.current?.disconnect();
    openModal({ title: '새로운 녹음-240711', tag: '경제학원론' });
  }, [stopRecording, socketRef]);

  return (
    <div className={styles.container}>
      <RecordHeader handleQuit={handleQuit} />
      <article className={styles.captionContainer}>{recognitionResult}</article>
      <Modal />
    </div>
  );
};

export default Record;
