import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/HomeLayout/HomeLayout';
import MyBoard from './Main/MyBoard/MyBoard';
import RecordNote from './Main/RecordNote/RecordNote';
import TestMake from './Main/TestMake/TestMake';
import TimeTable from './Main/TimeTable/TimeTable';
import WeeklyTimeTable from './Main/TimeTable/WeeklyTimeTable/WeeklyTimeTable';
import MonthlyTimeTable from './Main/TimeTable/MonthlyTimeTable/MonthlyTimeTable';

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
        children: [
          {
            path: '',
            element: <WeeklyTimeTable />,
          },
          {
            path: 'monthly',
            element: <MonthlyTimeTable />,
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
