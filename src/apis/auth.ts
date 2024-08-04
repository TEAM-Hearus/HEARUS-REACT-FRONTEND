import { API_URL } from '.';

interface IEmailAuthSignUpParams {
  userEmail: string;
  userPassword: string;
}

interface IGoogleLoginParams {
  state: string;
  code: string;
}

interface IAuthResponse {
  status: string;
  msg: string;
  object: ITokens;
}

interface ITokens {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export const googleLogin = async ({ state, code }: IGoogleLoginParams) => {
  try {
    const res = await fetch(
      `${API_URL}/login/oauth2/code/google?state=${state}&code=${code}`,
      {
        credentials: 'include',
      },
    );
    const data: IAuthResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};

export const emailLogin = async ({
  userEmail,
  userPassword,
}: IEmailAuthSignUpParams) => {
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        userPassword,
        userIsOAuth: false,
      }),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data: IAuthResponse = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const emailSignUp = async ({
  userEmail,
  userPassword,
}: IEmailAuthSignUpParams) => {
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        userPassword,
        userIsOAuth: false,
        userId: 'hearus',
        userName: '김히얼',
        userSchool: '건국대학교',
        userMajor: '경제학과',
        userFrade: 'junior',
        userUsePurpose: 'offline',
      }),
    });
    console.log(res);
    const data: IAuthResponse = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error('SignUp failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
