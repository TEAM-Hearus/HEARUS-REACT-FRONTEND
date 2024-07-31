import { createPortal } from 'react-dom';
import X from '../../../assets/images/cancel.svg?react';
import Play from '../../../assets/images/play.svg?react';
import styles from './ScriptDetailModal.module.scss';
import { useState } from 'react';

interface IProps {
  scriptId: string;
  closeModal: () => void;
}

const data = {
  name: '경제학원론_2023-07-01',
  processedScript: [
    '경제학은 우리 주변의 다양한 경제 현상을 이해하고 분석하는 데 도움이 되는 중요한 학문입니다',
    '특히, 최근에는 경제적 불평등, 기후 변화, 글로벌 경제 위기 등 다양한 경제 문제들이 우리 사회에 큰 영향을 미치고 있습니다.',
    '경제학은 희소한 자원이라는 제약 조건 하에서 인간의 욕구를 충족시키기 위한 선택과 행동을 연구하는 사회과학입니다.',
    '긍정적 분석은 경제 현상이 어떻게 작동하는지를 설명하는 데 초점을 맞춥니다. 경제 모델, 통계 분석, 실험 등 다양한 방법을 사용하여 경제 현상을 객관적으로 분석합니다.',
    '규범적 분석은 경제 현상이 어떻게 작동해야 하는지에 대한 판단을 내리는 데 초점을 맞춥니다. 경제 정책, 윤리적 고려, 가치 판단 등을 통해 경제 현상에 대한 바람직한 방향을 제시합니다.',
    '경제학은 우리 주변의 다양한 경제 현상을 이해하고 분석하는 데 도움이 되는 중요한 학문입니다',
    '특히, 최근에는 경제적 불평등, 기후 변화, 글로벌 경제 위기 등 다양한 경제 문제들이 우리 사회에 큰 영향을 미치고 있습니다.',
    '경제학은 희소한 자원이라는 제약 조건 하에서 인간의 욕구를 충족시키기 위한 선택과 행동을 연구하는 사회과학입니다.',
    '긍정적 분석은 경제 현상이 어떻게 작동하는지를 설명하는 데 초점을 맞춥니다. 경제 모델, 통계 분석, 실험 등 다양한 방법을 사용하여 경제 현상을 객관적으로 분석합니다.',
    '규범적 분석은 경제 현상이 어떻게 작동해야 하는지에 대한 판단을 내리는 데 초점을 맞춥니다. 경제 정책, 윤리적 고려, 가치 판단 등을 통해 경제 현상에 대한 바람직한 방향을 제시합니다.',
    '경제학은 우리 주변의 다양한 경제 현상을 이해하고 분석하는 데 도움이 되는 중요한 학문입니다',
    '특히, 최근에는 경제적 불평등, 기후 변화, 글로벌 경제 위기 등 다양한 경제 문제들이 우리 사회에 큰 영향을 미치고 있습니다.',
    '경제학은 희소한 자원이라는 제약 조건 하에서 인간의 욕구를 충족시키기 위한 선택과 행동을 연구하는 사회과학입니다.',
    '긍정적 분석은 경제 현상이 어떻게 작동하는지를 설명하는 데 초점을 맞춥니다. 경제 모델, 통계 분석, 실험 등 다양한 방법을 사용하여 경제 현상을 객관적으로 분석합니다.',
    '규범적 분석은 경제 현상이 어떻게 작동해야 하는지에 대한 판단을 내리는 데 초점을 맞춥니다. 경제 정책, 윤리적 고려, 가치 판단 등을 통해 경제 현상에 대한 바람직한 방향을 제시합니다.',
  ],
};

const ScriptDetailModal = ({ scriptId, closeModal }: IProps) => {
  const [time, setTime] = useState('00:00:00');

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  console.log(scriptId);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <article className={styles.contentContainer} onClick={handleContentClick}>
        <span className={styles.xBtn} onClick={closeModal}>
          <X />
        </span>
        <p className={styles.title}>{data.name}</p>
        <div className={styles.playBox}>
          <span className={styles.playBtn}>
            <Play />
          </span>
          <p className={styles.time}>{time}</p>
        </div>
        <p className={styles.textBox}>{data.processedScript.join(' ')}</p>
      </article>
    </div>,
    document.body,
  );
};

export default ScriptDetailModal;
