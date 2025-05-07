import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ApiError,
  LoginApiResponse,
  User,
  loginResponse,
} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------- Register API ---------
export const registerApi = createAsyncThunk<
  User,
  {fullName: string; username: string; email: string; password: string}
>('auth/register', async userData => {
  const response = await fetch('https://quizz3.onrender.com/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register');
  }

  return await response.json();
});

// ---------- Login API ---------------
export const loginApi = createAsyncThunk<
  LoginApiResponse,
  loginResponse,
  {rejectValue: ApiError}
>('auth/login', async (loginData, {rejectWithValue}) => {
  try {
    
    const response = await fetch('https://quizz3.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),

    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      return rejectWithValue(errorData);
    }

    const data: LoginApiResponse = await response.json();
    if (data.token) {
      await Promise.all([
        AsyncStorage.setItem('userToken', data.token),
        AsyncStorage.setItem('fullName', data.data.fullName),
        AsyncStorage.setItem('username', data.data.username),
        AsyncStorage.setItem('email', data.data.email),
      ]);
    }
    return data;
  } catch (error) {
    console.error('Unexpected login error: ', error);
    return rejectWithValue({message: 'An unexpected error occurred'});
  }
});

// ---------- Forgot Password API
// export const forgotPasswordApi = createAsyncThunk<void, {email: string}>(
//   'auth/forgotPassword',
//   async ({email}, {rejectWithValue}) => {
//     try {
//       const response = await fetch(
//         'https://quizz3.onrender.com/api/forgotpassword',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({email}),
//         },
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.message || 'Failed to send OTP');
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Network error occurred');
//     }
//   },
// );
export const forgotPasswordApi = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://quizz3.onrender.com/api/forgotpassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  },
);

// ---------- Verify OTP API
// export const verifyOtpApi = createAsyncThunk<
//   void,
//   { resetToken: string },
//   {email: string; otp: string}
// >('auth/verifyOtp', async ({email, otp}) => {
//   const response = await fetch('https://quizz3.onrender.com/api/verifyotp', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({email, otp}),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'OTP verification failed');
//   }
// });

export const verifyOtpApi = createAsyncThunk<
  { resetToken: string }, 
  { email: string; otp: string }
>('auth/verifyOtp', async ({ email, otp }) => {
  const response = await fetch('https://quizz3.onrender.com/api/verifyotp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'OTP verification failed');
  }

  return data; // Ensure resetToken is returned
});


// ---------- Reset Password API
// export const resetPasswordApi = createAsyncThunk<
//   {success: boolean; message: string},
//   { newPassword: string; confirmPassword: string}
// >('auth/resetPassword', async ({ newPassword, confirmPassword}) => {
//   const response = await fetch(
//     'https://quizz3.onrender.com/api/resetpassword',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({newPassword, confirmPassword}),
//     },
//   );

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Failed to reset password');
//   }
//   return {success: true, message: 'Password reset successfully'};
// });

export const resetPasswordApi = createAsyncThunk<
  { success: boolean; message: string },
  { newPassword: string; confirmPassword: string; resetToken: string } 
>('auth/resetPassword', async ({ newPassword, confirmPassword, resetToken }) => {
  const response = await fetch(
    'https://quizz3.onrender.com/api/resetpassword',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resetToken}`, 
      },
      body: JSON.stringify({ newPassword, confirmPassword }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reset password');
  }
  return { success: true, message: 'Password reset successfully' };
});


// ------------- logoutApi
export const logoutApi = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch('https://quizz3.onrender.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Logout API Error:', await response.text());
        throw new Error('Unauthorized access, please login first.');
      }

      await AsyncStorage.removeItem('userToken'); 
    } catch (error: unknown) {
      console.error('Logout failed:', error);
      await AsyncStorage.removeItem('userToken'); 
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'An error occurred during logout.',
      );
    }
  }
);
