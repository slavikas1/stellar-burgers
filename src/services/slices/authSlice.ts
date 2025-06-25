import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

interface AuthState {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false
};

export const login = createAsyncThunk('auth/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('auth/logout', async () => logoutApi());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Пользователь не найден';
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось обновить данные пользователя';
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось выйти из системы';
      });
  }
});

export default authSlice.reducer;
export const { setAuthChecked } = authSlice.actions;
