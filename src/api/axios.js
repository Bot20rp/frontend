import axios from 'axios'

const instance = axios.create({
     baseURL : 'https://backend-si1-production-0e10.up.railway.app/api',
    withCredentials: true,
    timeout: 5000 
})

export default instance
