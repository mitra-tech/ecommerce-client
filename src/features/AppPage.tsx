import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { applicationLogout, saveToSessionStorage } from '../shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { IReduxState } from '../store/Store.interface';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import Home from './../features/home/components/Home';
import Index from './index/Index';

const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
  const navigate: NavigateFunction = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
        // dispatch buyer info
        // dispatch seller info

        if (authUser.username !== null) {
          console.log('add socket');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUserData, dispatch, appLogout, authUser.username]);

  const logoutUser = useCallback(async () => {
    if ((!currentUserData && appLogout) || isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }
  }, [currentUserData, dispatch, navigate, appLogout, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser, logoutUser]);

  if (authUser) {
    return !tokenIsValid && !authUser.id ? (
      <Index />
    ) : (
      <>
        <>
          <HomeHeader showCategoryContainer={showCategoryContainer} />
          <Home />
        </>
      </>
    );
  } else {
    return <Index />;
  }
};

export default AppPage;
