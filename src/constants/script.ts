export interface IScriptElement {
  id: string;
  name: string;
  processedScript: string[];
  scheduleElementId: number;
  lectureDate: string;
  createdAt: string;
  problems: null;
}

export const scriptElements: IScriptElement[] = [
  {
    id: '6694b81c95105f1845ebf05a',
    name: '미시경제학_2023-07-10',
    processedScript: [
      '오늘 미시경제학 수업에서는 소비자 선택 이론에 대해 알아보겠습니다.소비자는 효용을 극대화하는 방향으로 선택을 하게 되는데, 이때 예산 제약선과 무차별 곡선을 이용하여 최적 선택점을',
    ],
    scheduleElementId: 1,
    lectureDate: '2023-07-10T09:00:00.000+00:00',
    createdAt: '2024-07-15T05:48:12.451+00:00',
    problems: null,
  },
  {
    id: '6694b82695105f1845ebf05b',
    name: '거시경제학_2023-07-11',
    processedScript: [
      '이번 거시경제학 수업에서는 인플레이션에 대해 살펴보도록 하겠습니다.인플레이션은 화폐 가치의 하락으로 인해 물가 수준이 지속적으로 상승하는 현상을 말합니다.인플레이션의 원인으로는 수',
    ],
    scheduleElementId: 2,
    lectureDate: '2023-07-11T13:30:00.000+00:00',
    createdAt: '2024-07-15T05:48:22.313+00:00',
    problems: null,
  },
  {
    id: '6694b82e95105f1845ebf05c',
    name: '국제경제학_2023-07-12',
    processedScript: [
      '국제경제학 수업에서는 비교 우위론에 대해 알아보겠습니다.비교 우위란 한 나라가 다른 나라에 비해 상대적으로 더 효율적으로 생산할 수 있는 상품이 있다는 이론입니다.이를 바탕으로 국',
    ],
    scheduleElementId: 3,
    lectureDate: '2023-07-12T10:30:00.000+00:00',
    createdAt: '2024-07-15T05:48:30.618+00:00',
    problems: null,
  },
  {
    id: '6694b83495105f1845ebf05d',
    name: '계량경제학_2023-07-13',
    processedScript: [
      '계량경제학 수업에서는 회귀분석에 대해 살펴보겠습니다.회귀분석은 변수들 간의 관계를 파악하고 예측 모델을 만드는 데 사용되는 통계적 기법입니다.최소제곱법을 이용하여 회귀식의 계수를 ',
    ],
    scheduleElementId: 5,
    lectureDate: '2023-07-13T14:00:00.000+00:00',
    createdAt: '2024-07-15T05:48:36.706+00:00',
    problems: null,
  },
  {
    id: '6694b83c95105f1845ebf05e',
    name: '노동경제학_2023-07-14',
    processedScript: [
      '이번 노동경제학 수업에서는 인적자본이론에 대해 알아보도록 하겠습니다.인적자본이론은 교육이나 훈련을 통해 개인의 생산성을 높일 수 있다는 이론입니다.인적자본에 대한 투자를 통해 개인',
    ],
    scheduleElementId: 6,
    lectureDate: '2023-07-14T11:00:00.000+00:00',
    createdAt: '2024-07-15T05:48:44.721+00:00',
    problems: null,
  },
];
