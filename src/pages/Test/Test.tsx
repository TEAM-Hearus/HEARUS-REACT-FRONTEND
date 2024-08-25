import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TestHeader from '../../components/organisms/headers/TestHeader/TestHeader';
import MultipleChoice from '../../components/molecules/questions/MultipleChoice/MultipleChoice';
import OXChoice from '../../components/molecules/questions/OXChoice/OXChoice';
import ShortAnswer from '../../components/molecules/questions/ShortAnswer/ShortAnswer';
import Loading from '../../assets/images/LoadingCircle.gif';
import useTestModalStore from '../../store/useTestModalStore';
import useTestSettingsStore from '../../store/useTestSettingsStore';
import { generateProblem } from '../../apis/test';
import styles from './Test.module.scss';

const Test = () => {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { updateTestData, clearTestData } = useTestModalStore();
  const { lectureId, scheduleElementId, questionCount, questionTypes } =
    useTestSettingsStore();

  const inputData = {
    lectureId: lectureId,
    subject: scheduleElementId,
    problem_num: questionCount,
    problem_types: questionTypes.join(','),
  };

  const { data, isLoading } = useQuery({
    queryKey: ['problem', lectureId],
    queryFn: () => generateProblem(inputData),
    retry: false,
  });

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
    if (data != null && data.success === false) {
      alert('문제 생성을 실패했습니다. 다시 시도해주세요.');
      navigate('/home/test-make');
    }
  }, [data]);

  useEffect(() => {
    if (data != null && data.object != null) {
      setUserAnswers(Array(data.object.length).fill(''));
    }
  }, [data]);

  useEffect(() => {
    if (data != null && data.object != null) {
      updateTestData({ totalNum: data.object.length });
    }
    return () => clearTestData();
  }, [data]);

  return (
    <div className={styles.container}>
      <TestHeader handleSubmit={handleSubmit} showResults={showResults} />
      <article className={styles.problemsContainer}>
        {isLoading && (
          <img className={styles.loading} src={Loading} alt="문제 생성중..." />
        )}
        {data != null &&
          data.object != null &&
          data.object.map((question, index) => (
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
    </div>
  );
};

export default Test;
