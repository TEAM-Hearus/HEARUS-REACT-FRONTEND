import { API_URL, IApiResponse } from '.';

interface IEmailSignUpParams {
  userEmail: string;
  userPassword: string;
  userName: string;
}

interface IEmailLoginParams {
  userEmail: string;
  userPassword: string;
}

interface ISocialLoginParams {
  social: string;
  state: string;
  code: string;
}

interface ILoginResponse extends IApiResponse<ITokens> {}

interface IEmailSignupResponse extends IApiResponse<null> {}

interface ITokens {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export const OAuthLogin = async ({
  social,
  state,
  code,
}: ISocialLoginParams) => {
  try {
    const res = await fetch(
      `${API_URL}/login/oauth2/code/${social}?state=${state}&code=${code}`,
      {
        credentials: 'include',
      },
    );
    const data: ILoginResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};

export const emailLogin = async ({
  userEmail,
  userPassword,
}: IEmailLoginParams) => {
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
    const data: ILoginResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};

export const emailSignUp = async ({
  userEmail,
  userPassword,
  userName,
}: IEmailSignUpParams) => {
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
        userName,
      }),
    });
    const data: IEmailSignupResponse = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
