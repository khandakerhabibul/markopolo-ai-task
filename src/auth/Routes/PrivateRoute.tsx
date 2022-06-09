import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { SIGN_IN_ROUTE } from '../../routes/routes'

const useAuth = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return true
  }
  return false
}

function PrivateRoute() {
  const user = useAuth()
  return user ? <Outlet /> : <Navigate to={SIGN_IN_ROUTE} />
}

export default PrivateRoute
