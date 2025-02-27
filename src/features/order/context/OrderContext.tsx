import { Context, createContext } from 'react';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';

import { IOrderContext, IOrderDocument, IOrderInvoice } from '../interfaces/order.interfaces';

export const OrderContext: Context<IOrderContext> = createContext({
  order: {} as IOrderDocument,
  authUser: {} as IAuthUser,
  orderInvoice: {} as IOrderInvoice
}) as Context<IOrderContext>;
