import { FC, ReactElement } from 'react';

import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interfaces';
import { useGetRandomSellersQuery } from 'src/features/sellers/services/seller.service';

import FeaturedExperts from './FeaturedExperts';
import HomeSlider from './HomeSlider';
import HomeGigsView from './HomeGigsView';

const Home: FC = (): ReactElement => {
  const { data, isSuccess } = useGetRandomSellersQuery('10');

  let sellers: ISellerDocument[] = [];

  if (isSuccess) {
    sellers = data.sellers as ISellerDocument[];
  }

  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <HomeSlider />
      <HomeGigsView gigs={[]} title="Because you viewed a gig on" subTitle="" category={'Programming & Testing'} />
      <FeaturedExperts sellers={sellers} />
    </div>
  );
};

export default Home;
