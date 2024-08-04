import { emailSignUp } from '../../../apis/auth';
import AuthForm from './AuthForm';

const SignUp = () => (
  <AuthForm
    title="새 계정"
    buttonText="계정 생성하기"
    mutationFn={emailSignUp}
    successMessage="SignUp successful"
    errorMessage="이미 회원가입된 아이디입니다. 이메일을 확인해주세요."
    authGoBoxMessage="이미 계정이 있으신가요?"
    authGoLink="/login"
    authGoLinkMessage="로그인하기"
  />
);

export default SignUp;
