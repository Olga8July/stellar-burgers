import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import {
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError
} from '../../services/selectors/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orders = useSelector(selectUserOrders);
  const loading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className={`text text_type_main-medium pt-4`}>{error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
