import axios, {AxiosInstance} from 'axios'

const cliente: AxiosInstance = axios.create({
  baseURL:'http://localhost:3000/'
})


export default cliente
