![image](https://github.com/user-attachments/assets/9be2766a-7aed-4c24-a1db-16652bb706fd)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 프로젝트 소개
Hearus는 대학교 교내 청각장애 학우 대필지원 도우미 활동에서 느낀 문제들을 풀어내기 위해 시작되었습니다. </br>
청각장애 학우들이 더 나은 환경에서 학습하고, 비장애 학우들과의 교육적 불평등을 해소할 수 있도록 하기 위해 </br>
인공지능을 활용한 실시간 음성 텍스트 변환과 문제 생성, 하이라이팅 기능을 지닌 서비스입니다.

## MVP Model
![image](https://github.com/user-attachments/assets/6b86e0fc-93fa-4fc4-a77f-1750009f4488)

## 서비스 링크
<p align="center">
  <a href="https://hearus.site/" target="_blank">
    <img src="https://i.ibb.co/CWc1WmJ/logo.png" alt="HEARUS-logo" border="0" width="100"/>
  </a>
</p>

### 테스트 아이디, 비밀번호
```
아이디: hearus@naver.com
비밀번호: hearus@naver.com
```
### [기능명세서](https://github.com/TEAM-Hearus/HEARUS-REACT-FRONTEND/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B8%B0%EB%8A%A5%EB%AA%85%EC%84%B8%EC%84%9C)
## 기술 스택
| Language | Library | CSS | State Management | Data Fetching | Build | 배포 | CI/CD |
|--|--|--|--|--|--|--|--|
| ![image](https://github.com/user-attachments/assets/e5450c28-4022-4e1e-9c15-d962c8d0fe47) | ![image](https://github.com/user-attachments/assets/95a1b711-18d4-4c17-adff-02045bb2445b) | ![image](https://github.com/user-attachments/assets/62fcad28-4446-4ae5-a9b2-dcbbd8588d4e) | ![image](https://github.com/user-attachments/assets/f4eb48fc-d54b-4ab5-9299-bc27c6ae93da) | ![image](https://github.com/user-attachments/assets/03506e89-883b-4da8-a334-e5cad795b420) | ![image](https://github.com/user-attachments/assets/026f6425-a384-48d0-a3cc-3447e4d9ded8) | ![image](https://github.com/user-attachments/assets/50caa2e1-3f05-4059-90ae-c957a529f6ad) | ![image](https://github.com/user-attachments/assets/ad4e87cf-cdea-43f2-bc2d-d5b73769b53f)|
| TypeScript | React | Scss module | Zustand | Tanstack React Query | Vite | Firebase hosting | Github Actions |


## src 폴더구조
```
src/
│
├── assets/
│   ├── images/ # svg, gif, png 등 이미지
│   └── fonts/ # 폰트(Pretendard)
│
├── components/ # 아토믹 디자인 시스템 차용
│   ├── atoms/ 
|   ├── molecules/
|   ├── organisms/
│   └── templates/
│
├── hooks/ # 커스텀 훅
│
├── pages/ # 라우터로 나뉘는 페이지 컴포넌트
│
├── apis/ # API fetch 함수
│
├── store/ # 전역 상태관리
│
├── styles/
│   ├── colors.scss # 공통 색상 변수
│   └── fonts.scss # 공통 폰트 스타일 변수
│
├── utils/ # 유틸 함수
|
├── constants/ # 상수
│
├── App.tsx
└── main.tsx
```


## 설치 및 실행
1. 레포지토리 clone
   ```
   git clone https://github.com/TEAM-Hearus/HEARUS-REACT-FRONTEND
   ```

2. 프로젝트 디렉토리로 이동
   ```
   cd HEARUS-REACT-FRONTEND
   ```

3. npm 패키지 다운로드
   ```
   npm install
   ```

4. 애플리케이션 실행
   ```
   npm run dev
   ```

## 주요 기여자
| FE | FE | Designer |
|--|--|--|
|[김나연](https://github.com/Nangniya) |[고은비](https://github.com/koeunbeee)|장연우|

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 
</br>
자세한 내용은 [LICENSE](https://github.com/TEAM-Hearus/HEARUS-REACT-FRONTEND/blob/main/LICENSE) 파일을 참조해주세요.

## 🤝 기여하기

Hearus의 발전에 기여해 주셔서 감사합니다!
</br>
우리는 모든 형태의 기여를 환영합니다.

1. Issue 생성: 버그 리포트, 기능 제안, 또는 질문
2. Pull Request: 코드 개선, 문서화, 또는 새로운 기능 구현
3. Code Review: 다른 기여자의 PR을 리뷰하고 피드백 제공
4. Documentation: README, 위키, 또는 코드 주석 개선

자세한 기여 가이드라인은 [CONTRIBUTING.md](https://github.com/TEAM-Hearus/.github/blob/main/CONTRIBUTING.md)를 참조해 주세요.</br>
또한 프로젝트에 대한 문의사항이 있으시다면 [ISSUE](https://github.com/TEAM-Hearus/.github/tree/main/ISSUE_TEMPLATE)를 생성해 주세요.

---
<p align="center">
  모두의 들을 권리를 위하여 Hearus가 함께하겠습니다
  </br></br>
  <img src="https://img.shields.io/badge/TEAM-Hearus-FF603D?style=for-the-badge" alt="TEAM-Hearus">
</p>

