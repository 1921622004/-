import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['content-type'] = 'x-www-form-urlencoded';
axios.interceptors.response.use(res => res.data)
axios.defaults.withCredentials = true;


export function register(phone,password){
    return axios.post('/register',{
        phone,
        password
    })
}