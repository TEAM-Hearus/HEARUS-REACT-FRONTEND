import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/HomeLayout/HomeLayout';
import TimeTable from './Main/TimeTable/TimeTable';
import TestMake from './Main/TestMake/TestMake';
import MyScript from './Main/MyScript/MyScript';
import TrashCan from './Main/TrashCan/TrashCan';
import PrivateRoute from './PrivateRoute';
import Record from './Record/Record';
import Test from './Test/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/home',
    element: <PrivateRoute element={<HomeLayout />} />,
    children: [
      {
        path: '',
        element: <MyScript />,
      },
      {
        path: 'time-table',
        element: <TimeTable />,
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
  {
    path: '/record',
    element: <PrivateRoute element={<Record />} />,
  },
  {
    path: '/test',
    element: <PrivateRoute element={<Test />} />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
