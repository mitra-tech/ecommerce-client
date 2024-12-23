import { FC, Suspense } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import AppPage from './features/AppPage';
import Home from './features/home/components/Home';
import ResetPassword from './features/auth/components/ResetPassword';
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import ProtectedRoute from './features/ProtectedRoute';

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      )
    },
    {
      path: '/',
      element: <Suspense>
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      </Suspense>
    }
  ];
  return useRoutes(routes);
};

export default AppRouter;
