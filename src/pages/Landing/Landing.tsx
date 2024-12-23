import { Link, Navigate } from 'react-router-dom';
import TextCarousel from '../../components/molecules/landings/TextCarousel/TextCarousel';
import ImageCarousel from '../../components/molecules/landings/ImageCarousel/ImageCarousel';
import Logo from '../../assets/images/logo/landing-logo.svg?react';
import graph1 from '../../assets/images/landing/graph1.png';
import graph2 from '../../assets/images/landing/graph2.png';
import function1 from '../../assets/images/landing/function1.png';
import function2 from '../../assets/images/landing/function2.png';
import function3 from '../../assets/images/landing/function3.png';
import oss1 from '../../assets/images/landing/oss1.png';
import oss2 from '../../assets/images/landing/oss2.png';
import { checkAuthentication } from '../../utils/auth';
import styles from './Landing.module.scss';

const Landing = () => {
  const isAuthenticated = checkAuthentication();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return (
    <main>
      <section className={styles.topBgContainer}>
        <header className={styles.header}>
          <Logo />
          <div className={styles.authBtnsContainer}>
            <Link to="/login" className={styles.loginBtn}>
              로그인
            </Link>
            <Link to="/signup" className={styles.startBtn}>
              무료로 시작하기
            </Link>
          </div>
        </header>
        <div className={styles.bgImg}>
          <div className={styles.outerCircleInImg}>
            <div className={styles.innerCircleInImg}>
              <h1 className={styles.h1}>HEARUS</h1>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.introductionContainer}>
        <article className={styles.upIntro}>
          <div className={styles.h2Container}>
            <h2 className={styles.about}>ABOUT HEARUS</h2>
            <h2 className={styles.aboutKorean}>
              히어러스는 어떤 서비스인가요?
            </h2>
          </div>
          <div className={styles.h3Container}>
            <h3 className={styles.h3}>
              히어러스는 대학교 교내 청각장애 학우 대필지원 도우미 활동에서 느낀
              문제들을 풀어내기 위해 시작되었습니다.
            </h3>
            <h3 className={styles.h3}>
              청각장애 학우들이 더 나은 환경에서 학습하고, 비장애 학우들과의
              교육적 불평등을 해소할 수 있도록 하기 위해
            </h3>
            <h3 className={styles.h3}>
              인공지능을 활용한 실시간 음성 텍스트 변환과 문제 생성, 하이라이팅
              기능을 지닌 서비스입니다.
            </h3>
          </div>
        </article>
        <article className={styles.downIntro}>
          <section className={styles.backGroundIntro}>
            <p className={styles.title}>Background</p>
            <span>
              <p>등록 청각 장애인의 지속적인 성장세 속에서,</p>
              <p>청각 장애인의 고등 교육기관 진학의 어려움 등의</p>
              <p>문제들은 오랜 기간동안 해결되지 못했으며</p>
              <p>수어가 없는 고등 교육 환경에서 청각 장애 학우들은</p>
              <p>이해하지 못하는 수업을 따라가기 급급했습니다.</p>
            </span>
          </section>
          <section className={styles.graphContainer}>
            <p>전체 청각장애 등록 장애인 현황</p>
            <img src={graph1} alt="전체 청각장애 등록 장애인 현황" />
          </section>
          <section className={styles.graphContainer}>
            <p>수어 없는 수업의 내용 이해도 설문조사(2020)</p>
            <img
              src={graph2}
              alt="수어 없는 수업의 내용 이해도 설문조사(2020)"
            />
          </section>
        </article>
      </section>
      <section className={styles.functionsContainer}>
        <div className={styles.functionsTitleContainer}>
          <p className={styles.functionTitle}>FUNCTION</p>
          <p className={styles.funcitonSubTitle}>
            모두에게 평등한 학습 환경, 히어러스가 만들어 나갈게요
          </p>
        </div>
        <div className={styles.functionBoxContainer}>
          <article className={styles.functionBox}>
            <img
              className={styles.functionImg}
              src={function1}
              alt="청각장애학우 지원"
            />
            <p className={styles.boxTitle}>청각장애학우 지원</p>
            <span className={styles.descriptionContainer}>
              <p>강의 중, 조별과제, 회의 상황에서</p>
              <p>실시간 음성인식 자막을 통해</p>
              <p>빠르게 이해하고 소통할 수 있어요</p>
            </span>
          </article>
          <article className={styles.functionBox}>
            <img
              className={styles.functionImg}
              src={function2}
              alt="학습효율 향상"
            />
            <p className={styles.boxTitle}>학습효율 향상</p>
            <span className={styles.descriptionContainer}>
              <p>녹음 스크립트가 준비되었다면</p>
              <p>테스트 자동 생성 기능으로</p>
              <p>어려운 부분을 찾아 복습해보세요</p>
            </span>
          </article>
          <article className={styles.functionBox}>
            <img
              className={styles.functionImg}
              src={function3}
              alt="교육적 불평등 완화"
            />
            <p className={styles.boxTitle}>교육적 불평등 완화</p>
            <span className={styles.descriptionContainer}>
              <p>너무 빠르거나 익숙하지 않아서,</p>
              <p>곧바로 이해하기 어려운 수업도</p>
              <p>여러 번 읽고 깊게 생각해보세요</p>
            </span>
          </article>
        </div>
      </section>
      <section className={styles.carouselsContainer}>
        <TextCarousel />
        <ImageCarousel />
      </section>
      <section className={styles.finalSection}>
        <p>모두의 들을 권리를 위하여 Hearus가 함께 하겠습니다.</p>
      </section>
      <footer className={styles.footer}>
        <article className={styles.footerLeftContainer}>
          <div className={styles.footerTitleContainer}>
            <p className={styles.footerTitle}>Hearus(A175)</p>
            <p className={styles.footerTitle}>
              일반부문 지정과제 (사회문제형-교육)
            </p>
          </div>
          <div className={styles.footerBody}>
            <div className={styles.footerLeftBody}>
              <div className={styles.footerColumn}>
                <p>대표자 민상연</p>
                <p>연락처 010-3232-0437</p>
              </div>
            </div>
            <Link to="/license" className={styles.license}>
              라이센스 정보
            </Link>
          </div>
        </article>
        <article className={styles.footerRightContainer}>
          <img src={oss1} />
          <img src={oss2} />
        </article>
      </footer>
    </main>
  );
};

export default Landing;
