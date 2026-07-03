import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectUserData,
  selectAuthChecked
} from '../../services/selectors/selectors';
import { useNavigate } from 'react-router-dom';

import {
  createOrder,
  closeOrderModal as closeOrderModalAction
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData) as TOrder | null;
  const user = useSelector(selectUserData);
  const isAuthChecked = useSelector(selectAuthChecked);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = constructorItems?.bun ?? null;
  const ingredients = constructorItems?.ingredients ?? [];

  const orderIngredients = useMemo(() => {
    const ids: string[] = [];
    if (bun) {
      ids.push(bun._id);
      ids.push(bun._id);
    }
    ingredients.forEach((item) => ids.push(item._id));
    return ids;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuthChecked || !user) {
      navigate('/login', { replace: true });
      return;
    }

    dispatch(createOrder(orderIngredients));
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModalAction());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
