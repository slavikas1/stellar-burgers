import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { selectOrdersData } from '../../services/slices/ordersDataSlice';
import {
  fetchOrderByNumber,
  orderDetails,
  clearOrderDetails
} from '../../services/slices/orderDetailsSlice';
import { ingredientsList } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrdersData);
  const orderFromOrders = orders.find((order) => order.number === orderNumber);

  const orderFromDetails = useAppSelector(orderDetails);
  const ingredients = useAppSelector(ingredientsList);

  const orderData = orderFromOrders || orderFromDetails;

  useEffect(() => {
    if (!orderFromOrders && orderNumber) {
      dispatch(clearOrderDetails());
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderNumber, orderFromOrders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
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
      {}
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

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
