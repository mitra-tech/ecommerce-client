import { FC, ReactElement } from 'react';
import Button from 'src/shared/button/Button';

import ProfileHeader from '../profile/components/ProfileHeader';

const SellerDashboard: FC = (): ReactElement => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mt-10 flex flex-col justify-between gap-y-4">
        <ProfileHeader showHeaderInfo={false} showEditIcons={false} />
        <div className="self-end">
          <Button
            className="bg-green-transparent w-full rounded-md text-center text-xs font-bold text-green-500 hover:text-green-600 focus:outline-none md:bg-green-500 md:px-3 md:py-2 md:text-sm md:text-white hover:md:bg-green-600 hover:md:text-white"
            label="Create New Gig"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
