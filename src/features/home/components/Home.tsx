import { FC, ReactElement } from 'react';

import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interfaces';
import { useGetRandomSellersQuery } from 'src/features/sellers/services/seller.service';

import FeaturedExperts from './FeaturedExperts';
import HomeSlider from './HomeSlider';
import HomeGigsView from './HomeGigsView';
import { useGetGigsByCategoryQuery } from 'src/features/gigs/services/gigs.service';
import { useAppSelector } from 'src/store/Store';
import { IReduxState } from 'src/store/Store.interface';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';

const Home: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  const { data, isSuccess } = useGetRandomSellersQuery('10');
  const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`);
  let sellers: ISellerDocument[] = [];
  let categoryGigs: ISellerGig[] = [];

  if (isSuccess) {
    sellers = data.sellers as ISellerDocument[];
  }
  if (isCategorySuccess) {
    categoryGigs = categoryData.gigs as ISellerGig[];
  }
  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <HomeSlider />
      {categoryGigs.length > 0 && (
        <HomeGigsView gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
      )}
      <FeaturedExperts sellers={sellers} />
    </div>
  );
};

export default Home;
