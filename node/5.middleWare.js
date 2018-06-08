let express = require('express');
let app = express();

app.listen(3000);


app.use((req,res,next) => {
    let t = new Date().getTime();
    let end = res.end;
    res.end = function(...a){
        console.log(new Date().getTime() - t);
        end.call(res,...a);
    };
    next();
})
app.get('/water',(req,res) => {
    for(let i = 0; i<10000000;i++){

    }
    res.end('water');
})
app.get('/food',(req,res) =>{
    for(let i = 0 ;i<100000;i++){

    }
    res.end('food');
})


