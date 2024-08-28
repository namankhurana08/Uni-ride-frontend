import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:8000'
  baseURL: 'https://charming-hosiery-fly.cyclic.app'
})

export default instance
