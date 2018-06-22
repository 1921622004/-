const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let app = express();


app.listen(3000);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", req.get('Origin'));
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.use(session({
    secret:'awesome',
    resave:true,
    saveUninitialized:true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(async function(req,res,next){
    req.userData = JSON.parse(await readFile('./data/user.json','utf8'))
    next()
})

app.post('/register',(req,res) => {
    console.log(1);
     
    let {query,body,userData} = req;  
    let obj = {
        phone:body.phone,
        password:body.password
    }
    userData.push(obj);
    writeFile('./data/user.json',JSON.stringify(userData))
        .then(() =>{
            res.send({
                code:0,
                message:'ok'
            })
        })
        .catch(err => {
            res.send({
                code:1,
                message:'no'
            })
        })
})



