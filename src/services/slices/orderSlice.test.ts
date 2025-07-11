import orderSlice, { createOrder } from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice', () => {
  const initialState = {
    order: null,
    loading: false,
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

  it('createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      order: mockOrder,
      loading: false,
      error: null
    });
  });

  it('createOrder.rejected', () => {
    const error = 'Failed to create order';
    const action = {
      type: createOrder.rejected.type,
      payload: error
    };
    const state = orderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error
    });
  });
});