import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing/Landing';
import HomeLayout from '../components/templates/HomeLayout/HomeLayout';
import TimeTable from './Main/TimeTable/TimeTable';
import TestMake from './Main/TestMake/TestMake';
import MyScript from './Main/MyScript/MyScript';
import MyPage from './Main/Mypage/Mypage';
import ProfileEdit from './Main/Mypage/ProfileEdit/ProfileEdit';
import PrivateRoute from './PrivateRoute';
import Record from './Record/Record';
import Test from './Test/Test';
import OAuthCallback from './Auth/OAuthCallback';
import Login from './Auth/AuthForm/Login';
import SignUp from './Auth/AuthForm/SignUp';
import ErrorPage from './Error/ErrorPage';
import License from './License/License';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/license',
    element: <License />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/:provider/callback',
    element: <OAuthCallback />,
  },
  {
    path: '/home',
    element: <PrivateRoute element={<HomeLayout />} />,
    errorElement: <ErrorPage />,
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
        path: 'my-page',
        children: [
          {
            path: '',
            element: <MyPage />,
          },
          { path: 'edit', element: <ProfileEdit /> },
        ],
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
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
