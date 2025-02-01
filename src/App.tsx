import { FC, ReactElement, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import AppRouter from './AppRoutes';
import { socketService } from './sockets/socket.service';

const App: FC = (): ReactElement => {
  // once the component is mounted, we will setup the socket connection to socket.io server
  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

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
