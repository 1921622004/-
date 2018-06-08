let express = require('express');
let app = express();

app.listen(3000);

app.get('/user',(req,res) => {
    res.end('select all');
});


//表示必须要，但是可以随机
// user/1/2   =>  {id:1,name:2}  req.params
app.get('/user/:id/:name',(req,res) => {
    res.end('select one' + req.params.id + req.params.name);
})


let url = '/user/1/2';
let url2 = '/user/:id/:name';
let keyAry = [];
let valAry = [];
let regStr = url2.replace(/:[^\/]+/g,(...arg) => {
    keyAry.push(arg[0].slice(1));
    return '([^\/]+)'
})
let reg = new RegExp(regStr);
valAry = reg.exec(url);
let obj = {};
for (let index = 0; index < keyAry.length; index++) {
    let item = keyAry[index];
    obj[item] = valAry[index + 1];
}
console.log(obj);
