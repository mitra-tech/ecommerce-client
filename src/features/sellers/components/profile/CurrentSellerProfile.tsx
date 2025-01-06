import { FC, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import Button from 'src/shared/button/Button';
import { IResponse } from 'src/shared/shared.interface';
import { useAppDispatch, useAppSelector } from 'src/store/Store';
import { IReduxState } from 'src/store/Store.interface';

import { ISellerDocument } from '../../interfaces/seller.interfaces';
import { addSeller } from '../../reducers/seller.reducer';
import { useUpdateSellerMutation } from '../../services/seller.service';

const CurrentSellerProfile: FC = (): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller);
  const [showEdit, setShowEdit] = useState<boolean>(true);
  const { sellerId } = useParams();
  const dispatch = useAppDispatch();
  const [updateSeller] = useUpdateSellerMutation();

  const onUpdateSeller = async (): Promise<void> => {
    try {
      const response: IResponse = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap();
      dispatch(addSeller(response.seller));
      setSellerProfile(response.seller as ISellerDocument);
      setShowEdit(false);
    } catch (error) {
      console.log('Error updating profile.');
    }
  };

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${seller.username}`]} />

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
      </div>
    </div>
  );
};

export default CurrentSellerProfile;
