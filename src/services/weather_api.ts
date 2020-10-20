import axios from 'axios'

const weatherAPI = axios.create({
  baseURL: 'http://api.weatherapi.com/v1'
})

export default weatherAPI
