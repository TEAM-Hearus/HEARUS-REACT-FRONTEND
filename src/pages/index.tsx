import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/HomeLayout/HomeLayout';
import MyBoard from './MyBoard/MyBoard';
import RecordNote from './RecordNote/RecordNote';
import TestMake from './TestMake/TestMake';
import TimeTable from './TimeTable/TimeTable';
import DownLoad from './DownLoad/DownLoad';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/home',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <MyBoard />,
      },
      {
        path: 'record-note',
        element: <RecordNote />,
      },
      {
        path: 'test-make',
        element: <TestMake />,
      },
      {
        path: 'time-table',
        element: <TimeTable />,
      },
      {
        path: 'down-load',
        element: <DownLoad />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
