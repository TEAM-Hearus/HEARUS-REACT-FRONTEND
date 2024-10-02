import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useLocation,
} from 'react-router-dom';
import NotFoundImage from '../../assets/images/404image.png';
import AuthImage from '../../assets/images/401image.png';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();

  let errorMessage = '페이지를 찾을 수 없습니다.';
  let errorStatus = 404;

  // 401
  if (location.state?.errorStatus === 401) {
    errorStatus = 401;
    errorMessage = '인증 정보를 확인할 수 없습니다.';
  }
  // 404
  else if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || errorMessage;
  }
  // 기타
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={styles.errorPageWrapper}>
      {errorStatus === 401 ? (
        <div className={styles.errorpageBox}>
          <img
            className={styles.errorImg}
            src={AuthImage}
            alt="UnAuthorized Image"
          />
          <h1 className={styles.errorMsg}>{errorMessage}</h1>
          <div className={styles.captionsContainer}>
            <p className={styles.errorContent}>
              서비스 접속을 위한 인증 정보 확인이 필요합니다.
            </p>
            <p className={styles.errorContent}>관리자에게 문의해주세요.</p>
          </div>
          <div className={styles.btnsContainer}>
            <Link to="/home" className={styles.grayBtn}>
              홈으로 돌아가기
            </Link>
            <Link to="/login" className={styles.blackBtn}>
              로그인
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.errorpageBox}>
          <img
            className={styles.errorImg}
            src={NotFoundImage}
            alt="Not found Image"
          />
          <h1 className={styles.errorMsg}>{errorMessage}</h1>
          <p className={styles.errorContent}>다시 한 번 시도해 주세요</p>
          <Link to="/home" className={styles.blackBtn}>
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
};
export default ErrorPage;
