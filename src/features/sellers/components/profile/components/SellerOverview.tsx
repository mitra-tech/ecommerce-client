import { FC } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IProfileHeaderProps, ISellerDocument } from 'src/features/sellers/interfaces/seller.interfaces';

const SellerOverview: FC<IProfileHeaderProps> = ({ sellerProfile, setSellerProfile, showEditIcons }) => {
  return (
    <SellerContext.Provider value={{ showEditIcons, setSellerProfile, sellerProfile: sellerProfile as ISellerDocument }}>
      <div className="w-full py-4 lg:w-1/3">Left</div>

      <div className="w-full pl-4 py-4 lg:w-2/3">Right</div>
    </SellerContext.Provider>
  );
};

export default SellerOverview;
