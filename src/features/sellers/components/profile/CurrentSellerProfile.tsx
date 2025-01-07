import { FC, ReactElement, useEffect, useState } from 'react';
import equal from 'react-fast-compare';
import { useParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';

import Breadcrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import Button from 'src/shared/button/Button';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IResponse } from 'src/shared/shared.interface';
import { useAppDispatch, useAppSelector } from 'src/store/Store';
import { IReduxState } from 'src/store/Store.interface';
import { v4 as uuidv4 } from 'uuid';

import { ISellerDocument } from '../../interfaces/seller.interfaces';
import { addSeller } from '../../reducers/seller.reducer';
import { useUpdateSellerMutation } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';

const CurrentSellerProfile: FC = (): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller);
  const [showEdit, setShowEdit] = useState<boolean>(true);
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const dispatch = useAppDispatch();
  const [updateSeller, { isLoading }] = useUpdateSellerMutation();

  const onUpdateSeller = async (): Promise<void> => {
    try {
      const response: IResponse = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap();
      dispatch(addSeller(response.seller));
      setSellerProfile(response.seller as ISellerDocument);
      setShowEdit(false);
      console.log('Seller profile updated successfully.');
    } catch (error) {
      console.log('Error updating profile.');
    }
  };

  useEffect(() => {
    const isEqual: boolean = equal(sellerProfile, seller);
    setShowEdit(isEqual);
  }, [seller, sellerProfile]);

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${seller.username}`]} />
      {isLoading ? (
        <CircularPageLoader />
      ) : (
        <div className="container mx-auto px-2 md:px-0">
          <div className="my-2 flex h-8 justify-end md:h-10">
            {!showEdit && (
              <div>
                <Button
                  className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
                  label="Update"
                  onClick={onUpdateSeller}
                />
                &nbsp;&nbsp;
                <Button
                  className="md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2"
                  label="Cancel"
                  onClick={() => {
                    setShowEdit(false);
                    setSellerProfile(seller);
                    dispatch(addSeller(seller));
                  }}
                />
              </div>
            )}
          </div>
          <ProfileHeader sellerProfile={sellerProfile} setSellerProfile={setSellerProfile} showHeaderInfo={true} showEditIcons={true} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white">
            <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentSellerProfile;
