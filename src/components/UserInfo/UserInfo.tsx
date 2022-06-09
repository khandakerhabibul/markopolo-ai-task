import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './userInfo.module.css'
import ProfileImage from '../../assets/default-profile-img.png'
import { USER_MANAGEMENT_ROUTE } from '../../routes/routes'
import { useAppDispatch } from '../../store/store'
import { storeSingleUser } from '../../containers/Dashboard/DashboardStore/dashboardSlice'
import { User } from '../../utils/userInterfaces'

type InputProps = {
  userInfo: User
}

type UserDataInputProps = {
  label: string
  value: string
}

function UserData(props: UserDataInputProps) {
  const { label, value } = props
  return (
    <div className={styles.userInfoText}>
      <span className={styles.underline}>{label}</span> : {value}
    </div>
  )
}

function UserInfo(props: InputProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userInfo } = props
  const { id, name, username, address, email, phone, country } = userInfo
  const { street, city } = address

  const handleGoToUserManagement = () => {
    dispatch(storeSingleUser({ ...userInfo }))
    navigate(USER_MANAGEMENT_ROUTE)
  }

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userImage}>
        <img src={ProfileImage} height="90px" width="90px" alt="user" />
      </div>
      <div className={styles.userPersonalInfo}>
        <div className={styles.userName}>{name}</div>
        <UserData label="Id" value={`${id}`} />
        <UserData label="Username" value={username} />
        <UserData label="Address" value={`${street} `} />
      </div>
      <div>
        <UserData label="Email" value={email} />
        <UserData label="Phone" value={phone} />
        <UserData label="City" value={city} />
        <UserData label="Country" value={country} />
      </div>
      <div className={styles.userViewDetails}>
        <div onClick={handleGoToUserManagement} aria-hidden="true">
          View details
        </div>
      </div>
    </div>
  )
}

export default UserInfo
