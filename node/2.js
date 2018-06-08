let express = require('express');
let app = express();
app.listen(3000);

app.use((req,res,next) => {
    res.a = 10;
    next('route')
})
app.use((req,res,next) => {
    res.a = 12;
    next()
});
app.get('/user',(req,res,next) => {
    res.a = 13;
    next('route');
},(req,res,next) => {
    console.log(res.a);
    res.a = 14;
    next()
})
app.all('/user',(req,res) =>{
    console.log(res.a);
    res.end('ok');
})

