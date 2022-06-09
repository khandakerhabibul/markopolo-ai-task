/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import defaultAxios from '../../../axios'
// import { User } from '../../../utils/userInterfaces'
import moduleName from '../moduleInfo'
import singleUserRoute from '../utils/apiRoutes'

interface Id {
  id: number
}

export const deleteUserAsync = createAsyncThunk(
  `${moduleName}/deleteUserAsync`,
  async (payload: Id) => {
    const { id } = payload
    const response = await defaultAxios({
      method: 'DELETE',
      url: singleUserRoute(id),
    })
    const { data } = response
    return data
  }
)

interface UserManagementStates {
  loading: boolean
  // singleUser: User | null
}

const initialState: UserManagementStates = {
  loading: false,
  // singleUser: null,
}

const userManagementSlice = createSlice({
  name: `${moduleName}/dashboard`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.loading = false
      })
  },
})

// export const {  } = userManagementSlice.actions

export default userManagementSlice.reducer
