import { useEffect, useState } from 'react';
import { translateTypeToEnglish } from '../../../../utils/test';
import styles from './QuestionTypeBtn.module.scss';
import useQuestionTypeStore from '../../../../store/QuestionTypeStore';

interface IProps {
  children: string;
}

const QuestionTypeBtn = ({ children }: IProps) => {
  const enQuestionType = translateTypeToEnglish(children);
  const isIncluded = useQuestionTypeStore((state) =>
    state.questionTypes.includes(enQuestionType),
  );
  const { pushQuestionType, popQuestionType } = useQuestionTypeStore();
  const handleClick = () => {
    if (isIncluded) {
      popQuestionType(enQuestionType);
    } else {
      pushQuestionType(enQuestionType);
    }
  };

  return (
    <button
      className={`${styles.qtypeBtn} ${isIncluded && styles.active}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default QuestionTypeBtn;
