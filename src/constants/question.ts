export interface IQuestionProps {
  options: string[];
  answer: number | string;
  userAnswer: number | string;
  onAnswerChange: (answer: number | string) => void;
  showResult: boolean;
}

export const QUESTION_LIST = [
  {
    type: 'MultipleChoice',
    direction:
      '한계 효용 학파에 따르면, 합리적인 경제주체는 한계 비용과 같아지는 지점을 선택한다.',
    options: [
      '가장 높은 효용을 선택',
      '가장 낮은 비용을 선택',
      '가장 큰 수익을 선택',
      '한계 효용을 선택',
    ],
    answer: 3,
  },
  {
    type: 'ShortAnswer',
    direction:
      '알프레드 마셜이 1903년에 케임브리지 대학에 경제학과를 개설한 것은 최초였다.',
    options: [],
    answer: '',
  },
  {
    type: 'MultipleChoice',
    direction:
      '현대의 경제학은 _______과 더불어 사회과학 중 정말로 과학으로 분류되다시피 하는 영역이다.',
    options: ['도덕 철학', '정치학', '심리학과', '사회과학'],
    answer: 3,
  },
  {
    type: 'OXChoice',
    direction: '경제 이론을 바탕으로 국가의 경제 정책을 펼치고 있다.',
    options: [],
    answer: 1,
  },
];
