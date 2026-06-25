import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/currentOrderSlice';
import {
  selectCurrentOrder,
  selectCurrentOrderLoading,
  selectCurrentOrderError,
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors/selectors';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const orderData = useSelector(selectCurrentOrder);
  const orderLoading = useSelector(selectCurrentOrderLoading);
  const orderError = useSelector(selectCurrentOrderError);

  const ingredients = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (orderLoading) {
    return <Preloader />;
  }

  if (orderError) {
    return (
      <div className='text text_type_main-medium pt-4'>
        Ошибка загрузки заказа: {orderError}
      </div>
    );
  }

  if (ingredientsError) {
    return (
      <div className='text text_type_main-medium pt-4'>
        Ошибка загрузки ингредиентов: {ingredientsError}
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className='text text_type_main-medium pt-4'>Заказ не найден</div>
    );
  }

  if (ingredientsLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return (
      <div className='text text_type_main-medium pt-4'>
        Не удалось загрузить информацию об ингредиентах
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
