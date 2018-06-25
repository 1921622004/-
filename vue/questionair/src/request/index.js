import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers['content-type'] = 'x-www-form-urlencoded';
axios.interceptors.response.use(res => res.data)
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = data => {
    console.log(1);
    
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
    axios.defaults.headers['content-type'] = 'application/json; charset=utf-8';
    axios.defaults.transformRequest = data => {
        console.log(data);
        return JSON.stringify(data);
    }
    return axios.post('/addNewQ',newQ)
}

export function deleteQ(ary){
    axios.defaults.headers['content-type'] = 'application/json; charset=utf-8';
    axios.defaults.transformRequest = data => {
        console.log(data);
        return JSON.stringify(data);
    }
    return axios.post('/deleteQ',ary);
}