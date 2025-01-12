import { FC, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';

import { useGetSellerByIdQuery } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';

const SellerProfile: FC = (): ReactElement => {
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const { data: sellerData, isLoading } = useGetSellerByIdQuery(`${sellerId}`);

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
            {type === 'Active Gigs' && <div>Active Gigs</div>}
            {type === 'Rating & Reviews' && <div>Rating & Reviews</div>}

          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
