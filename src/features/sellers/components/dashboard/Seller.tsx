import { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from 'src/features/gigs/services/gigs.service';
import DashboardHeader from 'src/shared/header/components/DashboardHeader';

import { ISellerDocument } from '../../interfaces/seller.interfaces';
import { useGetSellerByIdQuery } from '../../services/seller.service';
import { IOrderDocument } from 'src/features/order/interfaces/order.interfaces';

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams<string>();
  const { data, isSuccess } = useGetSellerByIdQuery(`${sellerId}`);
  const { data: sellerGigs, isSuccess: isSellerGigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`);
  const { data: sellerPausedGigs, isSuccess: isSellerPausedGigsSuccess } = useGetSellerPausedGigsQuery(`${sellerId}`);
  let gigs: ISellerGig[] = [];
  const orders: IOrderDocument[] = [];
  let pausedGigs: ISellerGig[] = [];
  let seller: ISellerDocument | undefined = undefined;

  if (isSuccess) {
    seller = data?.seller as ISellerDocument;
  }

  if (isSellerGigsSuccess) {
    gigs = sellerGigs?.gigs as ISellerGig[];
  }

  if (isSellerPausedGigsSuccess) {
    pausedGigs = sellerPausedGigs?.gigs as ISellerGig[];
  }

  // to do: seller order success

  return (
    <div className="relative w-screen">
      <DashboardHeader />
      <div className="m-auto px-6 w-screen xl:container md:px-12 lg:px-6 relative min-h-screen">
        <Outlet context={{ seller, gigs, pausedGigs, orders }} />
      </div>
    </div>
  );
};

export default Seller;
