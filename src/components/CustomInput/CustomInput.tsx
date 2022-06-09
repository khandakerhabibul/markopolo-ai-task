/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './customInput.module.css'

type InputProps = {
  label: string
  value: string
  handleChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  marginRight: string
}

function CustomInput(props: InputProps) {
  const {
    label,
    value,
    handleChangeFunc,
    placeholder,
    marginRight = '0px',
  } = props
  return (
    <div className={styles.customInputContainer} style={{ marginRight }}>
      <div className={styles.customInputLabel}>{label}</div>
      <input
        type="text"
        value={value}
        onChange={handleChangeFunc}
        placeholder={placeholder}
        className={styles.customInputStyle}
      />
    </div>
  )
}

export default CustomInput
