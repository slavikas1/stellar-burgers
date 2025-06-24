import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import {
  fetchFeedOrders,
  selectFeedOrders
} from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedOrders())}
    />
  );
};
