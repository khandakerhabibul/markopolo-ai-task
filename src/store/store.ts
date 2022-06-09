import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import dashboardReducer from '../containers/Dashboard/DashboardStore/dashboardSlice'
import userManagementReducer from '../containers/UserManagement/UserManagementStore/userManagementSlice'

const store = configureStore({
  reducer: {
    dashboardReducer,
    userManagementReducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
