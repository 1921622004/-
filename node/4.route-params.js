let express = require('express');
let app = express();

app.listen(3000);


//  拦截功能，在这里的req，res都是同一个
app.param('id',(req,res,next) => {
    req.params.id = `id是${req.params.id}`;
    console.log(req.params.id);
    res.header('Content-type','text/plain;charset=utf-8');
    next();
})

app.param('name',(req,res,next) => {
    req.params.name = `name是${req.params.name}`;
    console.log(req.params.name);
    next();
})

app.get('/user/:id/:name',(req,res)=>{
    res.end(`${req.params.id}${req.params.name}`);
})


