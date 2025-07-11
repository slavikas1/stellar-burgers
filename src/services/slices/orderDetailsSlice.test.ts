import orderDetailsSlice, { fetchOrderByNumber, clearOrderDetails } from './orderDetailsSlice';
import { TOrder } from '@utils-types';

describe('orderDetailsSlice', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['60d3b41abdacab0026a733c6'],
    status: 'done',
    name: 'Test Burger',
    createdAt: '2023-07-12T12:00:00.000Z',
    updatedAt: '2023-07-12T12:00:00.000Z',
    number: 1
  };

  it('fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderDetailsSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderDetailsSlice(initialState, action);
    expect(state).toEqual({
      order: mockOrder,
      isLoading: false,
      error: null
    });
  });

  it('fetchOrderByNumber.rejected', () => {
    const action = { type: fetchOrderByNumber.rejected.type };
    const state = orderDetailsSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка'
    });
  });

  it('clearOrderDetails', () => {
    const stateWithOrder = orderDetailsSlice(
      initialState,
      { type: fetchOrderByNumber.fulfilled.type, payload: mockOrder }
    );
    const state = orderDetailsSlice(
      stateWithOrder,
      clearOrderDetails()
    );
    expect(state).toEqual(initialState);
  });
});