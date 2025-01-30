import { Context, createContext } from 'react';
import { emptySellerData } from 'src/shared/utils/static-data';

import { ISellerContext } from '../interfaces/seller.interfaces';

export const SellerContext: Context<ISellerContext> = createContext({
  showEditIcons: false,
  sellerProfile: emptySellerData
}) as Context<ISellerContext>;
