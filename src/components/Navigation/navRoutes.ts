import {
  CREATE_USER_ROUTE,
  DASHBOARD_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from '../../routes/routes'

const NAV_ROUTES = [
  {
    name: 'Dashboard',
    path: DASHBOARD_ROUTE,
  },
  {
    name: 'User Management',
    path: USER_MANAGEMENT_ROUTE,
  },
  {
    name: 'Create User',
    path: CREATE_USER_ROUTE,
  },
]
export default NAV_ROUTES
