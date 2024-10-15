import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IApiResponse } from '../apis';

/** 401(인증정보 없음)일 때 401 페이지 띄우는 로직 */
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
