import feedSlice, { fetchFeedOrders } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6'],
      status: 'done',
      name: 'Test Burger',
      createdAt: '2023-07-12T12:00:00.000Z',
      updatedAt: '2023-07-12T12:00:00.000Z',
      number: 1
    }
  ];

  it('fetchFeedOrders.pending', () => {
    const action = { type: fetchFeedOrders.pending.type };
    const state = feedSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('fetchFeedOrders.fulfilled', () => {
    const action = {
      type: fetchFeedOrders.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 10,
        totalToday: 5
      }
    };
    const state = feedSlice(initialState, action);
    expect(state).toEqual({
      orders: mockOrders,
      total: 10,
      totalToday: 5,
      loading: false,
      error: null
    });
  });

  it('fetchFeedOrders.rejected', () => {
    const error = 'Failed to fetch orders';
    const action = {
      type: fetchFeedOrders.rejected.type,
      payload: error
    };
    const state = feedSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error
    });
  });
});