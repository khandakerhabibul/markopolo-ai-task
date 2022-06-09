import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD_ROUTE } from '../../routes/routes'
import styles from './signIn.module.css'

function SignIn() {
  const [userName, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const [validInfo, setValidInfo] = useState(true)
  const navigate = useNavigate()

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    setValidInfo(true)
  }

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value)
    setValidInfo(true)
  }

  const handleLogin = () => {
    if (userName !== '' && pwd !== '') {
      localStorage.setItem('user', userName)
      const user = localStorage.getItem('user')
      if (user) {
        navigate(DASHBOARD_ROUTE)
      }
    } else {
      setValidInfo(false)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate(DASHBOARD_ROUTE)
    }
  }, [])

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formHolder}>
        <h1>Welcome to Sign-in page!</h1>
        <div>
          (***Use random text for name and password. This is demo login)
        </div>
        <div className={styles.formStyle}>
          <div className={styles.marginBottom}>
            <div>User Name:</div>
            <input
              type="text"
              className={styles.inputStyle}
              onChange={handleUserName}
              value={userName}
            />
            {!validInfo && <div>***Provide user name</div>}
          </div>
          <div className={styles.marginBottom}>
            <div>Password:</div>
            <input
              type="password"
              value={pwd}
              onChange={handlePwd}
              className={styles.inputStyle}
            />
            {!validInfo && <div>***Provide password</div>}
          </div>
          <button
            className={styles.signInButton}
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
