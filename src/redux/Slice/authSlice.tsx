import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthState, LoginApiResponse} from '../../types';
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
  verifyOtpApi,
} from './IndexApi';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: undefined,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        fullName: action.payload.fullName,
        email: action.payload.email,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
  },
  extraReducers: builder => {
    // ------ register and login states
    builder
      .addCase(registerApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to register';
      })

      .addCase(loginApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginApi.fulfilled,
        (state, action: PayloadAction<LoginApiResponse>) => {
          state.loading = false;
          state.user = {
            fullName: action.payload.data.fullName,
            email: action.payload.data.email,
            userId: action.payload.data.userId,
            username: action.payload.data.username,
          };
          state.token = action.payload.token;
        },
      )
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Login failed';
      })
      // ------ forgot password states
      .addCase(forgotPasswordApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordApi.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send OTP';
      })
      //------ verify OTP states
      .addCase(verifyOtpApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpApi.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyOtpApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'OTP verification failed';
      })
      //------- reset password states
      .addCase(resetPasswordApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordApi.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reset password';
      })

      //------- logout states
      .addCase(logoutApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = undefined; 
        state.error = null;
      })
      .addCase(logoutApi.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Logout failed';
        state.user = null;
        state.token = undefined; 
      });
      
  },
});

export const {loginSuccess, setToken} = authSlice.actions;
export default authSlice.reducer;
