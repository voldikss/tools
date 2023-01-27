import Axios from 'axios'

export const baseURL = 'http://localhost:9000'
Axios.defaults.baseURL = baseURL
Axios.defaults.withCredentials = true

export const HTTPClient = Axios
