import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  fetchOrdersData,
  selectOrdersData
} from '../../services/slices/ordersDataSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(selectOrdersData);

  useEffect(() => {
    dispatch(fetchOrdersData());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
