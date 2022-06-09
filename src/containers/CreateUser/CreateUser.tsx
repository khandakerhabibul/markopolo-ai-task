/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomInput from '../../components/CustomInput/CustomInput'
import { DASHBOARD_ROUTE } from '../../routes/routes'
import { RootState, useAppDispatch } from '../../store/store'
import styles from './createUser.module.css'
import {
  createNewUserAsync,
  updateUserInfoAsync,
} from './CreateUserStore/createUserSlice'

interface IsValidProps {
  name: string
  userName: string
  email: string
  street: string
  city: string
  phone: string
  country: string
}

interface FormHolderProps {
  name: string
  userName: string
  email: string
  street: string
  city: string
  phone: string
  country: string
  buttonText: string
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleUserName: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePhone: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStreet: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCity: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCountry: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleUser: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function FormHolder(props: FormHolderProps) {
  const {
    name,
    userName,
    street,
    city,
    country,
    email,
    phone,
    buttonText,
    handleName,
    handleUserName,
    handleEmail,
    handlePhone,
    handleStreet,
    handleCity,
    handleCountry,
    handleUser,
  } = props
  return (
    <>
      <div className={styles.inputContainer}>
        <CustomInput
          label="Name"
          value={name}
          handleChangeFunc={handleName}
          placeholder="User's name..."
          marginRight="50px"
        />
        <CustomInput
          label="Username"
          value={userName}
          handleChangeFunc={handleUserName}
          placeholder="Username..."
          marginRight="0px"
        />
        <CustomInput
          label="Email"
          value={email}
          handleChangeFunc={handleEmail}
          placeholder="Email..."
          marginRight="50px"
        />
        <CustomInput
          label="Street"
          value={street}
          handleChangeFunc={handleStreet}
          placeholder="Street name..."
          marginRight="0px"
        />
        <CustomInput
          label="City"
          value={city}
          handleChangeFunc={handleCity}
          placeholder="City..."
          marginRight="50px"
        />
        <CustomInput
          label="Phone number"
          value={phone}
          handleChangeFunc={handlePhone}
          placeholder="Phone number..."
          marginRight="0px"
        />
        <CustomInput
          label="Country"
          value={country}
          handleChangeFunc={handleCountry}
          placeholder="Country...."
          marginRight="0px"
        />
      </div>
      <div className={styles.handleUser}>
        <button
          type="button"
          onClick={handleUser}
          className={styles.handleUserBtn}
        >
          {buttonText}
        </button>
      </div>
    </>
  )
}

const isValid = (props: IsValidProps) => {
  const { name, userName, email, street, city, phone, country } = props
  return (
    name !== '' &&
    userName !== '' &&
    email !== '' &&
    street !== '' &&
    city !== '' &&
    phone !== '' &&
    country !== ''
  )
}

function CreateUser() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const [header, setHeader] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('')

  const [userId, setUserId] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  const { singleUser } = useSelector((state: RootState) => {
    const { dashboardReducer } = state
    return {
      singleUser: dashboardReducer.singleUser,
    }
  })

  useEffect(() => {
    if (searchParams.get('update')) {
      setHeader('Update user details')
      setButtonText('Update user')
    } else {
      setHeader('Create a new user')
      setButtonText('Create user')
    }
  }, [])

  useEffect(() => {
    if (singleUser) {
      setUserId(singleUser.id)
      setName(singleUser.name)
      setUserName(singleUser.username)
      setEmail(singleUser.email)
      setPhone(singleUser.phone)
      setCity(singleUser.address.city)
      setStreet(singleUser.address.street)
      setCountry(singleUser.country)
    }
  }, [singleUser])

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  }
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value)
  }

  const checkForNewUser = () => {
    if (!searchParams.get('update')) {
      return true
    }
    return false
  }

  const checkForUpdateUser = () => {
    if (searchParams.get('update') && singleUser) {
      return true
    }
    return false
  }

  const handleUser = () => {
    if (isValid({ name, userName, email, street, city, phone, country })) {
      // Update or Create user
      const payloadData = {
        name,
        username: userName,
        email,
        address: { street, city },
        phone,
        country,
      }
      if (checkForNewUser()) {
        dispatch(createNewUserAsync({ ...payloadData }))
          .unwrap()
          .then(() => {
            navigate(DASHBOARD_ROUTE)
          })
          .catch(() => alert('Error Occured!'))
      } else {
        dispatch(updateUserInfoAsync({ id: userId, payloadData }))
          .unwrap()
          .then(() => {
            navigate(DASHBOARD_ROUTE)
          })
          .catch(() => alert('Error Occured!'))
      }
    } else {
      alert('Please fill all the fields!')
    }
  }

  const goBack = () => {
    navigate(DASHBOARD_ROUTE)
  }

  return (
    <div className={styles.createUserContainer}>
      <div className={styles.goBack} onClick={goBack} aria-hidden="true">
        Go back to dashboard
      </div>
      <div className={styles.header}>{header}</div>
      <div className={styles.bodyContainer}>
        <div className={styles.inputHolder}>
          {searchParams.get('update') && !singleUser && (
            <div className={styles.noData}>
              You are in update page. Please select a user from{' '}
              <span className={styles.link} aria-hidden="true" onClick={goBack}>
                here
              </span>
              to view the details.
            </div>
          )}
          {(checkForNewUser() || checkForUpdateUser()) && (
            <FormHolder
              name={name}
              userName={userName}
              street={street}
              city={city}
              country={country}
              email={email}
              phone={phone}
              buttonText={buttonText}
              handleName={handleName}
              handleUserName={handleUserName}
              handleEmail={handleEmail}
              handlePhone={handlePhone}
              handleStreet={handleStreet}
              handleCity={handleCity}
              handleCountry={handleCountry}
              handleUser={handleUser}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateUser
