import axios from 'axios'

const axiosapi = axios.create({
    baseURL:"https://backendsapkota.onrender.com",
    withCredentials:true
})

export default axiosapi