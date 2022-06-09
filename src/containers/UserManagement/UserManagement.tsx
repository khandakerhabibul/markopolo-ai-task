import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CREATE_USER_ROUTE, DASHBOARD_ROUTE } from '../../routes/routes'
import { RootState, useAppDispatch } from '../../store/store'
import styles from './userManagement.module.css'
import ProfileImage from '../../assets/default-profile-img.png'
import { deleteUserAsync } from './UserManagementStore/userManagementSlice'

type SingleInfoInputProps = {
  label: string
  value: string
}

function SingleInfo(props: SingleInfoInputProps) {
  const { label, value } = props
  return (
    <div className={styles.singleInfo}>
      <div className={styles.singleInfoLabel}>{label} : </div>
      <div className={styles.singleInfoValue}>{value}</div>
    </div>
  )
}

function UserManagement() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { singleUser } = useSelector((state: RootState) => {
    const { dashboardReducer } = state
    return {
      singleUser: dashboardReducer.singleUser,
    }
  })

  const handleDelete = () => {
    if (singleUser) {
      dispatch(deleteUserAsync({ id: singleUser.id }))
        .unwrap()
        .then(() => {
          navigate(DASHBOARD_ROUTE)
        })
        // eslint-disable-next-line no-alert
        .catch((err) => alert(`Error Occured! ${err.message}`))
    }
  }
  const handleUpdate = () => {
    navigate(`${CREATE_USER_ROUTE}?update=true`)
  }

  const handleGoToDashboard = () => {
    navigate(DASHBOARD_ROUTE)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.userManagementContainer}>
      <div className={styles.goBack} onClick={goBack} aria-hidden="true">
        Go back
      </div>
      <div className={styles.header}>Details of the user</div>
      {!singleUser && (
        <div className={styles.noData}>
          Please select a user from{' '}
          <span
            className={styles.link}
            aria-hidden="true"
            onClick={handleGoToDashboard}
          >
            here
          </span>
          to view the details.
        </div>
      )}
      {singleUser && (
        <div className={styles.userInfoContainer}>
          <div className={styles.userDataShow}>
            <div className={styles.userDataShowLeft}>
              <SingleInfo label="Name" value={singleUser.name} />
              <SingleInfo label="Username" value={singleUser.username} />
              <SingleInfo
                label="Address"
                value={
                  singleUser.address
                    ? `${singleUser.address.street}, ${singleUser.address.city}`
                    : 'N/A'
                }
              />
              <SingleInfo label="Email" value={singleUser.email} />
              <SingleInfo label="Phone" value={singleUser.phone} />
              <SingleInfo
                label="City"
                value={singleUser.address ? singleUser.address.city : 'N/A'}
              />
              <SingleInfo label="Country" value={singleUser.country} />
            </div>
            <div className={styles.userDataShowRight}>
              <img src={ProfileImage} height="150px" width="150px" alt="user" />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <button
              className={styles.userDeleteBtn}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className={styles.userEditBtn}
              type="button"
              onClick={handleUpdate}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
