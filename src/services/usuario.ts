import axios from 'axios'

export const apiUser = axios.create({
  baseURL: 'https://localhost:3004/usuario/'
})
