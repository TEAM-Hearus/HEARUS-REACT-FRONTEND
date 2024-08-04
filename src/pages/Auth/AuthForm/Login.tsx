import { emailLogin } from '../../../apis/auth';
import AuthForm from './AuthForm';

const Login = () => (
  <AuthForm
    title="로그인"
    buttonText="로그인"
    mutationFn={emailLogin}
    successMessage="Login successful"
    errorMessage="로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
    authGoBoxMessage="Hearus가 처음이신가요?"
    authGoLink="/signup"
    authGoLinkMessage="새 계정 만들기"
  />
);

export default Login;
