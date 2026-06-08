import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import {
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} from '../../services/selectors/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    dispatch(fetchFeeds());
  }, [dispatch]);

  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className={`text text_type_main-medium pt-4`}>{error}</div>;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
