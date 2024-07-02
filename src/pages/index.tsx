import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/HomeLayout/HomeLayout';
import MyBoard from './Main/MyBoard/MyBoard';
import RecordNote from './Main/RecordNote/RecordNote';
import TestMake from './Main/TestMake/TestMake';
import TimeTable from './Main/TimeTable/TimeTable';

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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
