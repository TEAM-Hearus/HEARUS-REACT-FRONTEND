import { Reset } from 'styled-reset';
import Router from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertComponent from './components/molecules/GlobalAlert/GlobalAlert';
import ConfirmAlert from './components/templates/modals/ConfirmAlert/ConfirmAlert';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
      <AlertComponent />
      <ConfirmAlert />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
