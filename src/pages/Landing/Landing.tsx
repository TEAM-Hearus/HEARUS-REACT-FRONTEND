import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo/landing-logo.svg?react';
import example from '../../assets/images/landing-myscript.jpg';
import styles from './Landing.module.scss';
import { SCROLLING_TEXTS } from '../../constants/landing';

const Landing = () => {
  return (
    <main>
      <section className={styles.topBgContainer}>
        <header className={styles.header}>
          <Link to="/login" className={styles.loginBtn}>
            로그인
          </Link>
          <Link to="/signup" className={styles.startBtn}>
            무료로 시작하기
          </Link>
        </header>
        <article className={styles.titleContainer}>
          <div className={styles.mainTitle}>
            <Logo />
            <h1 className={styles.h1}>HEARUS</h1>
          </div>
          <p className={styles.subTitle}>SIOGANNN SIOGANNN</p>
        </article>
      </section>
      <section className={styles.introductionContainer}>
        <article className={styles.upIntro}>
          <Logo />
          <p className={styles.hearus}>히어러스</p>
          <h2>
            (dummy)인사말, 히어러스는 어떤 가치를 추구하는 서비스인지, 어떻게
            시작되었는지,
          </h2>
          <h2>누구를 대상으로 하는지 설명</h2>
        </article>
        <article className={styles.downIntro}>
          <p>
            배경 통계 (장애학우의 증가, 도우미 서포터즈의 한계 간단하게 도표
            등으로 표시)
          </p>
        </article>
      </section>
      <section className={styles.functionsContainer}>
        <article className={styles.function}>
          <div className={styles.functionImg}></div>
          <h3>청각장애학우 지원</h3>
          <span className={styles.descriptionContainer}>
            <p>강의 중, 조별과제, 회의 상황에서</p>
            <p>실시간 음성인식 자막을 통해</p>
            <p>빠르게 이해하고 소통할 수 있어요</p>
          </span>
        </article>
        <article className={styles.function}>
          <div className={styles.functionImg}></div>
          <h3>학습효율 향상</h3>
          <span className={styles.descriptionContainer}>
            <p>녹음 스크립트가 준비되었다면</p>
            <p>테스트 자동 생성 기능으로</p>
            <p>어려운 부분을 찾아 복습해보세요</p>
          </span>
        </article>
        <article className={styles.function}>
          <div className={styles.functionImg}></div>
          <h3>교육적 불평등 완화</h3>
          <span className={styles.descriptionContainer}>
            <p>너무 빠르거나 익숙하지 않아서,</p>
            <p>곧바로 이해하기 어려운 수업도</p>
            <p>여러 번 읽고 깊게 생각해보세요</p>
          </span>
        </article>
      </section>
      <section className={styles.highLight}>
        {/* 스크롤 애니메이션 구현 예정 */}
        <article className={styles.scrollingContainer}>
          <div className={styles.scrollingText}>
            {SCROLLING_TEXTS.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </article>
        <img src={example} alt="recent script page example" />
      </section>
      <section className={styles.unCompleted}></section>
      <footer className={styles.footer}>
        <p>Hearus(히어러스)</p>
        <div className={styles.footerBody}>
          <div className={styles.footerColumn}>
            <p>대표자</p>
            <p>주소</p>
            <p>연락처</p>
          </div>
          <div className={styles.footerColumn}>
            <p>사업자 등록번호</p>
            <p>SNS계정</p>
          </div>
          <div className={styles.footerColumn}>
            <p>서비스 이용약관</p>
            <p>개인정보 처리방침</p>
            <p>이용자의 권리 및 유의사항</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
