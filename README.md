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
## 서비스 플로우
**1. 내 스크립트** : 스크립트 목록 클릭시 상세 스크립트 모달 등장, 상세 스크립트에서 과목 및 AI가 구분해준 하이라이트 표시 
|  스크립트 목록  |  상세 스크립트  |
|-------------------|--------------------|
|![image](https://github.com/user-attachments/assets/ecd3a0cf-62d3-4647-9b5c-ca70f4ccb904)| ![image](https://github.com/user-attachments/assets/8a321fb6-3b59-4d68-9c20-138abdfb0720) |
 
**2. 강의 녹음 자막 생성 페이지**: 내 스크립트 페이지에서 녹음 시작 버튼 클릭시 MediaRecorder API와 Socket.io 활용해 실시간 자막 생성
| 자막 생성 | 녹음 종료 모달 | 
|-------------------|--|
| ![image](https://github.com/user-attachments/assets/b2e43478-58ad-4f66-83c1-518cf871ee66) | ![image](https://github.com/user-attachments/assets/c161b894-3490-49e3-b793-4ebda89b2f8e)|
|  녹음 페이지 헤더의 '태그' 버튼을 클릭하면 과목 선택 가능  |  종료 버튼을 누르면 모달 등장, 모달에서도 과목 선택 가능  |

**3. 시간표 페이지**: 대학교 학기의 시간표에 맞춰 시간표 추가 가능 
| 시간표 해당 강의 스크립트 목록 툴팁 | 시간표 강의 추가 |
|--------------------------------------|-------------------|
|![image](https://github.com/user-attachments/assets/576d58a6-10c6-4ad8-bc02-7671f492e798)|![image](https://github.com/user-attachments/assets/2243d948-23aa-4c93-8885-7073ede95057)|
| 스크립트 목록 클릭시 스크립트 상세 모달 등장 <br> 삭제 클릭시 시간표 삭제 | 필요한 값을 입력후 시간표 추가(중복된 시간은 불가)|

**4. 문제 생성 페이지 및 문제 풀이 페이지**: 생성된 스크립트를 기반으로 AI가 문제 생성 후 문제 풀이
| 문제 생성 페이지 | 문제 풀이 페이지(gif) |
|-----------------|-------------------|
|![image](https://github.com/user-attachments/assets/acf2016f-4c13-442e-b4b8-4df0206e851a)| ![문제 풀이](https://github.com/user-attachments/assets/cd04d44c-da75-4c9e-9fb1-81a7f74a986c) |
| 스크립트, 문제 유형, 문제 개수, 제한시간(선택) 선택 후 '테스트 시작' 버튼 클릭시 문제 풀이 페이지로 링크 | 문제 종료시 틀린 문제는 빨간색, 맞춘 문제는 초록색으로 표시 | 

**5. 로그인, 회원가입**: 이메일: 회원가입 로그인 별도, OAuth: 회원가입 되어있지 않을 시 자동 회원가입 후 로그인
| 회원가입 페이지 | 로그인 페이지 |
|-----------------|----------------|
|![image](https://github.com/user-attachments/assets/b375c2d9-10c7-404e-84d4-6bbde0a644c1) | ![image](https://github.com/user-attachments/assets/5d6c2ce7-dd9f-4f57-b913-5d300bebbb4b) |
|  랜딩페이지에서 '무료로 시작하기' 버튼 클릭시 회원가입  |  랜딩페이지에서 '로그인' 버튼 클릭시 로그인  |

**5. 마이페이지**: 마이페이지
| 마이페이지 | 유저정보 입력 |
|----------------|-----------------|
| ![image](https://github.com/user-attachments/assets/3f44852b-702b-4467-a1aa-ea5424481626) | ![image](https://github.com/user-attachments/assets/0963ffbb-27bd-4883-a262-a924a3a6b05e) |
| 유저 정보 조회/수정 가능 | 추가정보 입력안했을 시 24시간 주기로 모달 띄우기 |

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
자세한 내용은 [LICENSE](https://github.com/TEAM-Hearus/HEARUS-REACT-FRONTEND/blob/main/LICENSE) 파일을 참조하세요.

## 🤝 기여하기

Hearus의 발전에 기여해 주셔서 감사합니다!
</br>
우리는 모든 형태의 기여를 환영합니다.

1. Issue 생성: 버그 리포트, 기능 제안, 또는 질문
2. Pull Request: 코드 개선, 문서화, 또는 새로운 기능 구현
3. Code Review: 다른 기여자의 PR을 리뷰하고 피드백 제공
4. Documentation: README, 위키, 또는 코드 주석 개선

자세한 기여 가이드라인은 [CONTRIBUTING.md](https://github.com/TEAM-Hearus/.github/blob/main/CONTRIBUTING.md)를 참조해 주세요.

---
<p align="center">
  모두의 들을 권리를 위하여 Hearus가 함께하겠습니다
  </br></br>
  <img src="https://img.shields.io/badge/TEAM-Hearus-FF603D?style=for-the-badge" alt="TEAM-Hearus">
</p>

