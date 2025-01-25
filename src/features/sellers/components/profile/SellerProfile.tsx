import { FC, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/services/gigs.service';
import Breadcrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { v4 as uuidv4 } from 'uuid';

import { useGetSellerByIdQuery } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';

const SellerProfile: FC = (): ReactElement => {
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const { data: sellerData, isLoading: isSellerLoading, isSuccess: isSellerSuccess } = useGetSellerByIdQuery(`${sellerId}`);
  const { data: gigData, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`);

  const isLoading: boolean = isSellerGigLoading && isSellerLoading && !isSellerSuccess && !isSellerGigSuccess;

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${sellerData && sellerData.seller ? sellerData.seller.username : ''}`]} />
      {isLoading ? (
        <CircularPageLoader />
      ) : (
        <div className="container mx-auto px-2 md:px-0">
          <ProfileHeader sellerProfile={sellerData?.seller} showHeaderInfo={true} showEditIcons={false} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white">
            {type === 'Overview' && <SellerOverview sellerProfile={sellerData?.seller} showEditIcons={false} />}
            {type === 'Active Gigs' && (
              <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {gigData?.gigs &&
                  gigData?.gigs.map((gig: ISellerGig) => (
                    <GigCardDisplayItem key={uuidv4()} gig={gig} linkTarget={false} showEditIcon={false} />
                  ))}
              </div>
            )}
            {type === 'Ratings & Reviews' && <div>Ratings & reviews </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
