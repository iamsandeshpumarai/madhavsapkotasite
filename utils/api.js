import axios from 'axios'

const axiosapi = axios.create({
    baseURL:"https://backendsapkota.onrender.com",
    // baseURL:"http://localhost:3000/",
    withCredentials:true
})

export default axiosapi