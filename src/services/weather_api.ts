import axios from 'axios'

const weatherAPI = axios.create({
  baseURL: 'https://api.weatherapi.com/v1'
})

export default weatherAPI
