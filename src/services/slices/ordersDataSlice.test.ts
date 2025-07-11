import ordersDataSlice, { fetchOrdersData } from './ordersDataSlice';
import { TOrder } from '@utils-types';

describe('ordersDataSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6'],
      status: 'done',
      name: 'Test Burger 1',
      createdAt: '2023-07-12T12:00:00.000Z',
      updatedAt: '2023-07-12T12:00:00.000Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['60d3b41abdacab0026a733c7'],
      status: 'pending',
      name: 'Test Burger 2',
      createdAt: '2023-07-12T12:30:00.000Z',
      updatedAt: '2023-07-12T12:30:00.000Z',
      number: 2
    }
  ];

  it('fetchOrdersData.pending', () => {
    const action = { type: fetchOrdersData.pending.type };
    const state = ordersDataSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('fetchOrdersData.fulfilled', () => {
    const action = {
      type: fetchOrdersData.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersDataSlice(initialState, action);
    expect(state).toEqual({
      orders: mockOrders,
      loading: false,
      error: null
    });
  });

  it('fetchOrdersData.rejected', () => {
    const error = 'Failed to fetch orders';
    const action = {
      type: fetchOrdersData.rejected.type,
      payload: error
    };
    const state = ordersDataSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error
    });
  });
});