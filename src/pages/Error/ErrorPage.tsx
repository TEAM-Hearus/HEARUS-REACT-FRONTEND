import styles from './ErrorPage.module.scss';
import {
  useRouteError,
  isRouteErrorResponse,
  useLocation,
  Link,
} from 'react-router-dom';
import NotFoundImage from '../../assets/images/404image.png';

interface LocationState {
  errorType?: string;
}

const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();
  const { errorType } = (location.state as LocationState) || {};

  let errorMessage: string = '페이지를 찾을 수 없습니다.';

  if (errorType === 'auth') {
    errorMessage = '인증 정보가 없습니다.';
  } else if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || errorMessage;
  }

  return (
    <div className={styles.errorPageWrapper}>
      {errorType === 'auth' ? (
        <div className={styles.errorpageBox}>{errorMessage}</div>
      ) : (
        <div className={styles.errorpageBox}>
          <img
            className={styles.errorImg}
            src={NotFoundImage}
            alt="Not found Image"
          />
          <h1 className={styles.errorMsg}> {errorMessage}</h1>
          <h5 className={styles.errorContent}> 다시 한 번 시도해 주세요</h5>
          <Link to="/home" className={styles.goHomeBtn}>
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
};
export default ErrorPage;
