let express = require('express');
let app = express();

app.listen(3000);

app.get('/user',(req,res)=>{
    console.log(req.query.id);   //   扩展的属性
    console.log(req.url); //获取整个路径包括问号后面的
    console.log(req.path); //不包括    扩展的属性
    console.log(req.headers); //所有的都是小写
    console.log(req.method); //请求的方法，所有的方法都是大写的
})