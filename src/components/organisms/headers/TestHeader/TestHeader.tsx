import { Link } from 'react-router-dom';
import styles from './TestHeader.module.scss';
import Back from '../../../../assets/images/arrow/back.svg?react';
import useTestModalStore from '../../../../store/useTestModalStore';
import TestModal from '../../../templates/modals/TestModal/TestModal';

const TEST_TITLE = '테스트-경제학원론-240708'; //임시

interface IProps {
  handleSubmit: () => void;
}

const TestHeader = ({ handleSubmit }: IProps) => {
  const handleClickQuitBtn = () => {
    openModal();
    handleSubmit();
  };

  const { isModalOpen, openModal, testData, updateTestData, clearTestData } =
    useTestModalStore();
  return (
    <header className={styles.container}>
      <span className={styles.linkContainer}>
        <Link to="/home/test-make">
          <Back />
        </Link>
      </span>
      <h1 className={styles.title}>{TEST_TITLE}</h1>
      <span className={styles.quitBtnContainer}>
        <button className={styles.quitBtn} onClick={handleClickQuitBtn}>
          종료
        </button>
      </span>
      {isModalOpen && <TestModal title={TEST_TITLE} />}
    </header>
  );
};

export default TestHeader;
