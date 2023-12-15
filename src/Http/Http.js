import axios from 'axios'

const Http = axios.create({
  baseURL: 'http://127.0.0.1:1987/',
})
export default Http
