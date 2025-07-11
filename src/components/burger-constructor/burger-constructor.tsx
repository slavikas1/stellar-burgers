import { FC, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectConstructorItems,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorElements = useAppSelector(selectConstructorItems);
  const isOrderDisabled =
    !constructorElements.bun || constructorElements.ingredients.length === 0;

  const { order, loading: orderRequest } = useAppSelector(
    (state) => state.order
  );
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const { user } = useAppSelector((state) => state.auth);

  const constructorItems = {
    bun,
    ingredients: ingredients || []
  };

  const onOrderClick = async () => {
    if (isOrderDisabled) return;
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      disabled={isOrderDisabled}
    />
  );
};
