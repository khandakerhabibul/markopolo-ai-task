/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './customSelect.module.css'

type ArrayProps = {
  name: string
  value: string
}

type CustomSelectProps = {
  label: string
  arrayData: ArrayProps[]
  handleChangeFunc: (event: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder: string
  marginRight: string
  width: string
}

function CustomSelect(props: CustomSelectProps) {
  const {
    label,
    arrayData,
    handleChangeFunc,
    placeholder,
    marginRight,
    width,
  } = props
  return (
    <div style={{ marginRight, width }}>
      <div className={styles.customSelectLabel}>{label}</div>
      <select
        className={styles.customSelect}
        name="cars"
        id="cars"
        onChange={handleChangeFunc}
        defaultValue="DEFAULT"
      >
        <option value="DEFAULT" disabled hidden>
          {placeholder}
        </option>
        {arrayData &&
          arrayData.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default CustomSelect
