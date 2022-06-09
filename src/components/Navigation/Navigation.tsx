import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SIGN_IN_ROUTE } from '../../routes/routes'
import styles from './navigation.module.css'
import NAV_ROUTES from './navRoutes'

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const user = localStorage.getItem('user')

  const handleRoute = (path: string) => {
    navigate(path)
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    navigate(SIGN_IN_ROUTE)
  }

  return user ? (
    <div className={styles.navContainer}>
      <div>Logo</div>
      <div className={styles.routes}>
        {NAV_ROUTES.map((route) => (
          <div
            key={`${route.path}`}
            className={styles.route}
            onClick={() => handleRoute(route.path)}
            aria-hidden="true"
            style={{
              borderBottom: pathname === route.path ? '2px solid #fff' : 'none',
            }}
          >
            {route.name}
          </div>
        ))}
        <div
          className={styles.logOut}
          onClick={handleLogOut}
          aria-hidden="true"
        >
          Log out
        </div>
      </div>
    </div>
  ) : null
}

export default Navigation
