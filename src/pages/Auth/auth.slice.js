import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from '../../api/auth.api'
import LocalStorage from '../../Constants/localStorage'

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await authApi.register(data)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const login = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await authApi.login(data)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const handleAuthFullfilled = (state, action) => {
  state.profile = action.payload.data
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
}

const auth = createSlice({
  name: 'auth',
  initialState: {
    profile: localStorage.getItem(LocalStorage.user) || {}
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFullfilled,
    [login.fulfilled]: handleAuthFullfilled
  }
})

const authReducer = auth.reducer
export default authReducer
