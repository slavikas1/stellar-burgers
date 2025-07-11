import authSlice, { setAuthChecked, login, register, fetchUser, updateUser, logout } from './authSlice';
import { TUser } from '../../utils/types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: false
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('setAuthChecked', () => {
    const action = setAuthChecked(true);
    const state = authSlice(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  describe('login', () => {
    it('login.pending', () => {
      const action = { type: login.pending.type };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        user: mockUser,
        isLoading: false,
        error: null,
        isAuthChecked: true
      });
    });

    it('login.rejected', () => {
      const error = 'Login failed';
      const action = {
        type: login.rejected.type,
        error: { message: error }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error
      });
    });
  });

  describe('register', () => {
    it('register.pending', () => {
      const action = { type: register.pending.type };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        isLoading: false
      });
    });

    it('register.rejected', () => {
      const error = 'Registration failed';
      const action = {
        type: register.rejected.type,
        error: { message: error }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error
      });
    });
  });

  describe('fetchUser', () => {
    it('fetchUser.pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('fetchUser.fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        isLoading: false
      });
    });

    it('fetchUser.rejected', () => {
      const error = 'User not found';
      const action = {
        type: fetchUser.rejected.type,
        error: { message: error }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error
      });
    });
  });

  describe('updateUser', () => {
    it('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('updateUser.fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const state = authSlice(
        { ...initialState, user: mockUser },
        action
      );
      expect(state).toEqual({
        ...initialState,
        user: updatedUser,
        isLoading: false
      });
    });

    it('updateUser.rejected', () => {
      const error = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: error }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error
      });
    });
  });

  describe('logout', () => {
    it('logout.pending', () => {
      const action = { type: logout.pending.type };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('logout.fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = authSlice(
        { ...initialState, user: mockUser },
        action
      );
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        user: null
      });
    });

    it('logout.rejected', () => {
      const error = 'Logout failed';
      const action = {
        type: logout.rejected.type,
        error: { message: error }
      };
      const state = authSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error
      });
    });
  });
});