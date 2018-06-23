import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['content-type'] = 'x-www-form-urlencoded';
axios.interceptors.response.use(res => res.data)
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = data => {
    let str = ``;
    if(data && typeof data === 'object'){
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                str += `${key}=${data[key]}&`
            }
        }
    }
    return str.substring(0, str.length - 1)
}

export function register(phone,password){
    return axios.post('/register',{
        phone,
        password
    })
}

export function loginR(phone,password){
    return axios.post('/login',{
        phone,
        password
    })
}

export function getData(){
    return axios.get('/getData')
}

export function addNewQ(newQ){
    return axios.post('/addNewQ',newQ)
}