import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/HomeLayout/HomeLayout';
import TimeTable from './Main/TimeTable/TimeTable';
import TestMake from './Main/TestMake/TestMake';
import WeeklyTimeTable from './Main/TimeTable/WeeklyTimeTable/WeeklyTimeTable';
import MonthlyTimeTable from './Main/TimeTable/MonthlyTimeTable/MonthlyTimeTable';
import MyScript from './Main/MyScript/MyScript';
import TrashCan from './Main/TrashCan/TrashCan';

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
        element: <MyScript />,
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
      {
        path: 'test-make',
        element: <TestMake />,
      },
      {
        path: 'trash-can',
        element: <TrashCan />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
