/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAxios from '../../../axios'
import { Address } from '../../../utils/userInterfaces'
import { getAllUserListRoute } from '../../Dashboard/utils/apiRoutes'
// import { User } from '../../../utils/userInterfaces'
import moduleName from '../moduleInfo'
import singleUserUpdateRoute from '../utils/apiRoutes'

interface PayloadType {
  username: string
  name: string
  address: Address
  email: string
  country: string
  phone: string
}

interface Payload {
  id: number
  payloadData: PayloadType
}

export const updateUserInfoAsync = createAsyncThunk(
  `${moduleName}/updateUserInfoAsync`,
  async (payload: Payload) => {
    const { id, payloadData } = payload
    const response = await defaultAxios({
      method: 'PUT',
      url: singleUserUpdateRoute(id),
      data: { ...payloadData },
    })
    const { data } = response
    return data
  }
)

export const createNewUserAsync = createAsyncThunk(
  `${moduleName}/createNewUserAsync`,
  async (payload: PayloadType) => {
    const response = await defaultAxios({
      method: 'POST',
      url: getAllUserListRoute(),
      data: { ...payload },
    })
    const { data } = response
    return data
  }
)

interface CreateUserStates {
  loading: boolean
  // singleUser: User | null
}

const initialState: CreateUserStates = {
  loading: false,
  // singleUser: null,
}

const createUserSlice = createSlice({
  name: `${moduleName}/dashboard`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserInfoAsync.fulfilled, (state) => {
        state.loading = false
        // state.singleUser = action.payload
      })
      .addCase(updateUserInfoAsync.rejected, (state) => {
        state.loading = false
      })
      .addCase(createNewUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewUserAsync.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createNewUserAsync.rejected, (state) => {
        state.loading = false
      })
  },
})

// export const {  } = createUserSlice.actions

export default createUserSlice.reducer
