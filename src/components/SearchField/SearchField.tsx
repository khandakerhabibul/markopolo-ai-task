/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './searchField.module.css'

type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  handleSearch: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function SearchField(props: InputProps) {
  const { value, handleChange, placeholder, handleSearch } = props
  return (
    <div className={styles.searchFieldContainer}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.inputStyle}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

export default SearchField
