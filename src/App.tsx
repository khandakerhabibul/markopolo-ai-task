import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PrivateRoute from './auth/Routes/PrivateRoute'
import SignIn from './auth/SignInScreen/SignIn'
import Navigation from './components/Navigation/Navigation'
import CreateUser from './containers/CreateUser/CreateUser'
import Dashboard from './containers/Dashboard/Dashboard'
import InnerContent from './containers/InnerContent/InnerContent'
import UserManagement from './containers/UserManagement/UserManagement'
import {
  CREATE_USER_ROUTE,
  DASHBOARD_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from './routes/routes'

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<InnerContent />}>
            <Route
              path="/"
              element={<Navigate replace to={DASHBOARD_ROUTE.slice(1)} />}
            />
            <Route path={DASHBOARD_ROUTE.slice(1)} element={<Dashboard />} />
            <Route
              path={USER_MANAGEMENT_ROUTE.slice(1)}
              element={<UserManagement />}
            />
            <Route path={CREATE_USER_ROUTE.slice(1)} element={<CreateUser />} />
          </Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
