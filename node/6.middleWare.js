let express = require('express');
let app = express();

app.listen(3000);

app.use((req,res,next) =>{
    console.log(req.params);
    console.log(req.url);
    console.log(req.path);
    next();
})

app.get('/user/:id/:name',(req,res) => {
    res.end('ok');
})