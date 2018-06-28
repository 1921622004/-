const express = require('express')
const session = require('express-session');
const queryString = require('querystring');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let app = express();


app.listen(3000);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get('Origin'));
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send('Current services support cross domain requests!');
    return;
  }
  next()
})

app.use(session({
  secret: 'awesome',
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  let str = '';
  req.on('data', chunk => {
    str += chunk;
  })
  req.on('end', () => {
    if(req.get('content-type').indexOf('application/json') >=0){
      req.body = JSON.parse(str);
    }else{
      req.body = queryString.parse(str)
    }
    next();
  })
})

app.use(async function (req, res, next) {
  req.userData = JSON.parse(await readFile('./data/user.json', 'utf8'))
  next()
})

app.post('/register', (req, res) => {
  let {
    query,
    body,
    userData
  } = req;
  let obj = {
    phone: body.phone,
    password: body.password
  }
  if (userData.find(item => item.phone === body.phone)) {
    res.send({
      code: 1,
      message: 'no'
    })
  } else {
    userData.push(obj);
    writeFile('./data/user.json', JSON.stringify(userData))
      .then(() => {
        res.send({
          code: 0,
          message: 'ok'
        })
      })
  }

});

app.post('/login',(req,res) => {
  let {body,userData} = req;
  let {phone,password} = body;
  if(userData.find(item => item.phone===phone && item.password === password)){
    req.session.userID = phone;
    res.send({
      code:0,
      message:'ok'
    })
  }else{
    res.send({
      code:1,
      message:'no'
    })
  }
})

app.get('/getData',(req,res) => {
  let {userData} = req;
  let userID = req.session.userID;
  let curUser = userData.find(item => item.phone == userID);
  if(!curUser.list){
    res.send({
      code:1,
      message:'no'
    })
  }else{
    res.send({
      code:0,
      message:'ok',
      list:curUser.list
    })
  }
})

app.post('/addNewQ',(req,res) => {
  let {body,userData} = req;
  let userID = req.session.userID;
  let curUser = userData.find(item => item.phone == userID);
  if(!curUser.list){
    curUser.list = []
  };
  body.id = Date.now();
  curUser.list.push(body);
  writeFile('./data/user.json',JSON.stringify(userData))
    .then(() => {
      res.send({
        code:0,
        message:'ok'
      })
    })
})

app.post('/deleteQ',(req,res) => {
  let {body,userData} = req;
  let userID = req.session.userID;
  let curUser = userData.find(item => item.phone == userID);
  if(!curUser.list){
    res.send({
      code:1,
      message:'ok'
    })
  }
  for (let i = 0; i < body.length; i++) {
    curUser.list[Number(body[i])] = undefined;
  }
  curUser.list = curUser.list.filter(item => typeof item !== 'undefined');
  writeFile('./data/user.json',JSON.stringify(userData))
    .then(() => {
      res.send({
        code:0,
        message:'ok'
      })
    })
    .catch(err => {
      res.send({
        code:1,
        message:err
      })
    })
})