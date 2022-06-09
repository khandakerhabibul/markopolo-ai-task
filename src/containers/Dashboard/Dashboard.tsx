import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../store/store'
import {
  getAllUserListAsync,
  storeSingleUser,
} from './DashboardStore/dashboardSlice'
import styles from './dashboard.module.css'
import SearchField from '../../components/SearchField/SearchField'
import UserInfo from '../../components/UserInfo/UserInfo'
import { User } from '../../utils/userInterfaces'
import CustomSelect from '../../components/CustomSelect/CustomSelect'

function Dashboard() {
  const [search, setSearch] = useState<string>('')
  const [countryFilter, setCountryFilter] = useState<string>('')
  const [usersData, setUsersData] = useState<User[]>([])

  const dispatch = useAppDispatch()
  const { userList } = useSelector((state: RootState) => {
    const { dashboardReducer } = state
    return {
      userList: dashboardReducer.userList,
    }
  })

  const user = localStorage.getItem('user')

  useEffect(() => {
    dispatch(getAllUserListAsync())
    dispatch(storeSingleUser(null))
  }, [])

  useEffect(() => {
    if (userList && Array.isArray(userList) && userList.length > 0) {
      setUsersData(userList)
    }
  }, [userList])

  const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (e.target.value === '') {
      setUsersData(userList)
      if (countryFilter !== '') {
        const emptySearchCountryFilter = userList.filter(
          (userObj) =>
            userObj.country.toLowerCase() === countryFilter.toLowerCase()
        )
        setUsersData(emptySearchCountryFilter)
      } else {
        setUsersData(userList)
      }
    }
  }

  const handleSearch = () => {
    if (search !== '') {
      const tempUsersList = [...userList]
      const filteredSearchData = tempUsersList.filter((userObj) =>
        userObj.name.toLowerCase().includes(search.toLowerCase())
      )
      if (countryFilter !== '') {
        const searchCountryFilter = filteredSearchData.filter(
          (userObj) =>
            userObj.country.toLowerCase() === countryFilter.toLowerCase()
        )
        setUsersData(searchCountryFilter)
      } else {
        setUsersData(filteredSearchData)
      }
    }
  }

  const handleFilterCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilter(e.target.value)
    const filteredCountryData = userList.filter(
      (userObj) =>
        userObj.country.toLowerCase() === e.target.value.toLowerCase()
    )
    if (search !== '') {
      const filteredCountryWithSearch = filteredCountryData.filter((userObj) =>
        userObj.name.toLowerCase().includes(search.toLowerCase())
      )
      setUsersData(filteredCountryWithSearch)
    } else {
      setUsersData(filteredCountryData)
    }
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temp = [...usersData]
    switch (e.target.value) {
      case 'ASC':
        temp.sort((a, b) => {
          return Number(a.id) - Number(b.id)
        })
        setUsersData(temp)
        break
      case 'DESC':
        temp.sort((a, b) => {
          return Number(b.id) - Number(a.id)
        })
        setUsersData(temp)
        break
      default:
        break
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2>Welcome to dashboard {user}!</h2>
      <div className={styles.textDetails}>
        Here is the list of all users.{' '}
        <span className={styles.highlight}>
          {`***For UPDATE and DELETE action go to user's View details. For creaing user go to Create User***`}
        </span>
      </div>
      <div className={styles.usersListInputRow} />
      <div className={styles.userListContainer}>
        <div className={styles.userCountHolder}>
          <div className={styles.userCount}>
            Users found ({usersData && usersData.length})
          </div>
          <div className={styles.searchFilterRow}>
            <SearchField
              value={search}
              handleChange={handleUpdateSearch}
              placeholder="Filter by name..."
              handleSearch={handleSearch}
            />
            <CustomSelect
              label="Country"
              arrayData={[
                { name: 'Bangladesh', value: 'Bangladesh' },
                { name: 'USA', value: 'USA' },
              ]}
              handleChangeFunc={handleFilterCountry}
              marginRight="0px"
              placeholder="Select country..."
              width="200px"
            />
            <CustomSelect
              label="Sort"
              arrayData={[
                { name: 'ASC', value: 'ASC' },
                { name: 'DESC', value: 'DESC' },
              ]}
              handleChangeFunc={handleSort}
              marginRight="15px"
              placeholder="Sort..."
              width="150px"
            />
          </div>
        </div>
        <div className={styles.userListShow}>
          {usersData &&
            usersData.map((userInfo) => (
              <div key={userInfo.id}>
                <UserInfo userInfo={userInfo} />
              </div>
            ))}
          {usersData && usersData.length === 0 && <div>No data found</div>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
