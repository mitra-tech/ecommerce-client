import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'node_modules/react-toastify/dist/components';

import AppRouter from './AppRoutes';

const App: FC = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen min-h-screen flex flex-col relative">
          <AppRouter />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
