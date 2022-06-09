import axios from 'axios'
import basicUrl from '../utils/apiUrl'

const defaultAxios = axios.create({
  baseURL: basicUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default defaultAxios
