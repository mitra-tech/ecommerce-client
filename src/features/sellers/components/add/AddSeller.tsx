import { FC, ReactElement } from 'react';

import Breadcrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { useAppSelector } from 'src/store/Store';
import { IReduxState } from 'src/store/Store.interface';

const AddSeller: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const isLoading = false;

  return (
    <div className="relative w-full">
      <Breadcrumb breadCrumbItems={['Seller', 'Create Profile']} />
      <div className="container mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0">
        {isLoading && (
          <CircularPageLoader/>
        )}
        {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8]">
            <span className="mt-20">Please verify your email</span>
          </div>
        )}

        <div className="left-0 top-0 z-10 mt-4 block h-full bg-white"></div>
      </div>
    </div>
  );
};

export default AddSeller;
