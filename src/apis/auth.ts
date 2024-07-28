import { API_URL } from '.';

interface IEmailLoginParams {
  userEmail: string;
  userPassword: string;
}

interface IGoogleLoginParams {
  state: string;
  code: string;
}

interface ILoginResponse {
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
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data: ILoginResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};
