import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Next from '../../../../assets/images/arrow/next-arrow.svg?react';
import Back from '../../../../assets/images/arrow/back-arrow.svg?react';
import { SupplementaryUpdateInfo } from '../../../../apis/user';
import styles from './SupplementaryInfoModal.module.scss';

interface UserInfo {
  userSchool: string;
  userMajor: string;
  userGrade: string;
}

interface IProps {
  onSkip: () => void;
  onSave: () => void;
}

const SupplementaryInfoModal = ({ onSkip, onSave }: IProps) => {
  const [info, setInfo] = useState<UserInfo>({
    userSchool: '',
    userMajor: '',
    userGrade: '1',
  });
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const increaseGrade = () => {
    if (parseInt(info.userGrade) < 8) {
      setInfo({
        ...info,
        userGrade: (parseInt(info.userGrade) + 1).toString(),
      });
    }
  };

  const decreaseGrade = () => {
    if (parseInt(info.userGrade) > 1) {
      setInfo({
        ...info,
        userGrade: (parseInt(info.userGrade) - 1).toString(),
      });
    }
  };
  const SupplementaryUpdateMutation = useMutation({
    mutationFn: SupplementaryUpdateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      localStorage.removeItem('SupplementarySkipped');
      localStorage.removeItem('lastRequestTime');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!info.userSchool && !info.userSchool) {
      alert('추가 정보를 모두 입력해야 합니다.');
      return;
    }
    SupplementaryUpdateMutation.mutate(info);
    onSave();
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.title}>
            더 정확한 녹음을 위해 추가 정보를 입력하세요
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
              학교
              <input
                className={styles.schoolInput}
                name="userSchool"
                value={info.userSchool}
                onChange={handleChange}
                placeholder="현재 학교를 입력하세요"
              />
            </label>
            <label className={styles.inputLabel}>
              학년
              <div className={styles.gradeInput}>
                <div className={styles.arrowBtn} onClick={decreaseGrade}>
                  <Back />
                </div>
                <span className={styles.gradeNum}>{info.userGrade}</span>
                <div className={styles.arrowBtn} onClick={increaseGrade}>
                  <Next />
                </div>
              </div>
            </label>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
              학과명
              <input
                className={styles.majorInput}
                name="userMajor"
                value={info.userMajor}
                onChange={handleChange}
                placeholder="학과명을 입력하세요"
              />
            </label>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.saveBtn} type="submit">
              저장하기
            </button>
            <button type="button" className={styles.nextBtn} onClick={onSkip}>
              다음에 할래요
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SupplementaryInfoModal;
