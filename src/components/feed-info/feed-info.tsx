import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { selectFeedOrders, selectFeed } from '../../services/slices/feedSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectFeedOrders);
  const { total, totalToday } = useAppSelector(selectFeed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    total,
    totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
