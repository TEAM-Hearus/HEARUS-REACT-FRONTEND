import { useQuery } from '@tanstack/react-query';
import { getLectureByScheduleElement } from '../../../apis/schedule';
import ScriptIcon from '../../../assets/images/nav/my-script-inactive.svg?react';
import styles from './ScriptToolTip.module.scss';

interface IProps {
  id: number;
}

const ScriptToolTip = ({ id }: IProps) => {
  const { data } = useQuery({
    queryKey: ['tooltip', id],
    queryFn: () => getLectureByScheduleElement(id),
  });

  return (
    <div className={styles.container}>
      {data?.map((lecture) => (
        <div className={styles.tooltipItem}>
          {lecture.name}
          <ScriptIcon />
        </div>
      ))}
    </div>
  );
};

export default ScriptToolTip;
