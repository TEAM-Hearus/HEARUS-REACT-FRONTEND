import { useEffect } from 'react';
import { useAlertStore } from '../store/useAlertStore';

/** GET 요청 중 서버 에러 발생시 '데이터를 불러오는 중 문제가 발생했습니다. 토스트 띄우는 로직 */
const useServerErrorToast = (isError: boolean) => {
  const { addAlert } = useAlertStore();

  useEffect(() => {
    if (isError) {
      addAlert('데이터를 불러오는 중 문제가 발생했습니다.', 'error');
    }
  }, [isError]);
};

export default useServerErrorToast;
