import styles from './ErrorPage.module.scss';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import NotFoundImage from '../../assets/images/404image.png';

interface LocationState {
  errorType?: string;
}

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  const { errorType } = (location.state as LocationState) || {};

  let errorMessage: string = '페이지를 찾을 수 없습니다.';
  let statusCode: string = '404';

  if (errorType === 'auth') {
    errorMessage = '인증 정보가 없습니다.';
    statusCode = '401';
  } else if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    errorMessage = error.statusText || errorMessage;
  }

  const goHome = () => {
    navigate('/home');
  };

  return (
    <div className={styles.errorPageWrapper}>
      {errorType === 'auth' ? (
        <div className={styles.errorpageBox}>{errorMessage}</div>
      ) : (
        <div className={styles.errorpageBox}>
          <img src={NotFoundImage} alt="Not found Image" />
          <h1> {errorMessage}</h1>
          <h5> 다시 한 번 시도해 주세요</h5>
          <button className={styles.goHomeBtn} onClick={goHome}>
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};
export default ErrorPage;
