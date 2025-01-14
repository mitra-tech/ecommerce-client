import { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import DashboardHeader from 'src/shared/header/components/DashboardHeader';

import { ISellerDocument } from '../../interfaces/seller.interfaces';
import { useGetSellerByIdQuery } from '../../services/seller.service';
import { IOrderDocument } from 'src/features/order/interfaces/order.interfaces';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams<string>();
  const { data, isSuccess } = useGetSellerByIdQuery(`${sellerId}`);
  const orders: IOrderDocument[] = [];
  const gigs: ISellerGig[] = [];
  const pausedGigs: ISellerGig[] = [];

  let seller: ISellerDocument | undefined = undefined;

  if (isSuccess) {
    seller = data?.seller as ISellerDocument;
  }
  // We are using the Outlet to render the child routes of the Header component. therefor we dont need to set the dashboard header in the component.
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
