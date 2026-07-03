import { FC, useMemo } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedCurrentTotal
} from '../../services/selectors/selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const currentTotal = useSelector(selectFeedCurrentTotal);

  const feed = {
    total,
    currentTotal
  };

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
