import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { applicationLogout, saveToSessionStorage } from '../shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { IReduxState } from '../store/Store.interface';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import Home from './home/components/Home';
import Index from './index/Index';
import { useGetCurrentBuyerByUsernameQuery } from './buyer/services/buyer.service';
import { addBuyer } from './buyer/reducers/buyer.reducer';
import { useGetSellerByUsernameQuery } from './sellers/services/seller.service';
import { addSeller } from './sellers/reducers/seller.reducer';

const AppPage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
  const { data: buyerData } = useGetCurrentBuyerByUsernameQuery(undefined, { skip: authUser.id === null });

  // in case there is a network issue, and there is no data for username in authuser(e.g. authuser is not loaded yet), we are going to get an error, therefore we need to skip the query from automatically running (if authUser.id === null(default value in Redux store) => skip the authUser query)
  const { data: sellerData } = useGetSellerByUsernameQuery(`${authUser.username}`, {
    skip: authUser.id === null
  });

  const logoutUser = useCallback(async () => {
    if ((!currentUserData && appLogout) || isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }
  }, [currentUserData, dispatch, navigate, appLogout, isError]);

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({ authInfo: currentUserData.user }));
        dispatch(addBuyer(buyerData?.buyer));
        dispatch(addSeller(sellerData?.seller));

        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));

        // dispatch seller info

        if (authUser.username !== null) {
          console.log('add socket');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUserData, dispatch, appLogout, authUser.username, buyerData, sellerData]);

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
