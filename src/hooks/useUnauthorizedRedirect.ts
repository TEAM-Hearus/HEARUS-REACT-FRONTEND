import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IApiResponse } from '../apis';

export const useUnauthorizedRedirect = (
  data: IApiResponse<unknown> | undefined,
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.status === 'UNAUTHORIZED') {
      queryClient.clear();
      navigate('/error', { state: { errorStatus: 401 } });
    }
  }, [data]);
};
