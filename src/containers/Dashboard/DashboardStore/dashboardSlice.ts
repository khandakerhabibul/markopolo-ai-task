/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAxios from '../../../axios'
import { User } from '../../../utils/userInterfaces'
import moduleName from '../moduleInfo'
import { getAllUserListRoute, getSingleUserRoute } from '../utils/apiRoutes'

export const getAllUserListAsync = createAsyncThunk(
  `${moduleName}/getAllUserListAsync`,
  async () => {
    const response = await defaultAxios({
      method: 'GET',
      url: getAllUserListRoute(),
    })
    const { data } = response
    return data
  }
)
export const getSingleUserAsync = createAsyncThunk(
  `${moduleName}/getSingleUserAsync`,
  async () => {
    const response = await defaultAxios({
      method: 'GET',
      url: getSingleUserRoute(1),
    })
    const { data } = response
    return data
  }
)

interface DashboardStates {
  loading: boolean
  userList: User[]
  singleUser: User | null
}

const initialState: DashboardStates = {
  loading: false,
  userList: [],
  singleUser: null,
}

const dashboardSlice = createSlice({
  name: `${moduleName}/dashboard`,
  initialState,
  reducers: {
    storeSingleUser: (state, action) => {
      state.singleUser = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserListAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUserListAsync.fulfilled, (state, action) => {
        state.loading = false
        state.userList = action.payload
      })
      .addCase(getAllUserListAsync.rejected, (state) => {
        state.loading = false
      })
      .addCase(getSingleUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getSingleUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.singleUser = action.payload
      })
      .addCase(getSingleUserAsync.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { storeSingleUser } = dashboardSlice.actions

export default dashboardSlice.reducer
