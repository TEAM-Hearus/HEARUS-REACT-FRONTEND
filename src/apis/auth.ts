import { API_URL } from '.';

interface IGoogleParams {
  state: string;
  code: string;
}

interface IGoogleLoginResponse {
  status: string;
  msg: string;
  object: ITokens;
}

interface ITokens {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export const googleLogin = async ({ state, code }: IGoogleParams) => {
  try {
    const res = await fetch(
      `${API_URL}/login/oauth2/code/google?state=${state}&code=${code}`,
      {
        credentials: 'include',
      },
    );
    const data: IGoogleLoginResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};
