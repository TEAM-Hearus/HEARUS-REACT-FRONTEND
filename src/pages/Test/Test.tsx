import { useEffect, useState } from 'react';
import TestHeader from '../../components/organisms/headers/TestHeader/TestHeader';
import MultipleChoice from '../../components/molecules/questions/MultipleChoice/MultipleChoice';
import OXChoice from '../../components/molecules/questions/OXChoice/OXChoice';
import ShortAnswer from '../../components/molecules/questions/ShortAnswer/ShortAnswer';
import { QUESTION_LIST } from '../../constants/question';
import styles from './Test.module.scss';
import useTestModalStore from '../../store/useTestModalStore';
import useTestSettingsStore from '../../store/useTestSettingsStore';
import { useQuery } from '@tanstack/react-query';
import { generateProblem } from '../../apis/test';

const Test = () => {
  const { lectureId, scheduleElementId, questionCount, questionTypes } =
    useTestSettingsStore();
  const inputData = {
    lectureId: lectureId,
    subject: scheduleElementId,
    problem_num: questionCount,
    problem_types: questionTypes.join(','),
  };

  const { data } = useQuery({
    queryKey: ['problem', lectureId],
    queryFn: () => generateProblem(inputData),
    retry: false,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>(
    Array(QUESTION_LIST.length).fill(''),
  );
  const [showResults, setShowResults] = useState(false);

  const { updateTestData, clearTestData } = useTestModalStore();

  const handleAnswerChange = (index: number, answer: string | number) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
    const completeNum = newAnswers.filter((answer) => answer !== '').length;
    updateTestData({ completeNum });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  useEffect(() => {
    updateTestData({ totalNum: QUESTION_LIST.length });
    return () => clearTestData();
  }, []);

  return (
    <div className={styles.container}>
      <TestHeader handleSubmit={handleSubmit} showResults={showResults} />
      <article className={styles.problemsContainer}>
        {QUESTION_LIST.map((question, index) => (
          <section key={question.direction} className={styles.questionBox}>
            <p className={styles.qestionNumber}>Q{index + 1}</p>
            <p className={styles.questionTitle}>{question.direction}</p>
            {question.type === 'MultipleChoice' && (
              <MultipleChoice
                options={question.options}
                answer={question.answer as number}
                userAnswer={userAnswers[index] as number}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                showResult={showResults}
              />
            )}
            {question.type === 'ShortAnswer' && (
              <ShortAnswer
                options={question.options}
                answer={question.answer}
                userAnswer={userAnswers[index] as string}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                showResult={showResults}
              />
            )}
            {question.type === 'OXChoice' && (
              <OXChoice
                options={question.options}
                answer={question.answer}
                userAnswer={userAnswers[index] as number}
                onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                showResult={showResults}
              />
            )}
          </section>
        ))}
      </article>
      {}
    </div>
  );
};

export default Test;
