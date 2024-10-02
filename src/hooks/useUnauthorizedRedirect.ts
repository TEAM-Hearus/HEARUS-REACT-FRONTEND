import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IApiResponse } from '../apis';

export const useUnauthorizedRedirect = (
  data: IApiResponse<unknown> | undefined,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === 'UNAUTHORIZED') {
      navigate('/error', { state: { errorStatus: 401 } });
    }
  }, [data]);
};
