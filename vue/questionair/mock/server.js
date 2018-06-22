const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let app = new Koa();
app.listen(3000);

app.use(bodyParser());


app.use(async (ctx,next) => {
    ctx.set("Access-Control-Allow-Origin",ctx.request.header['Origin'])
    // ctx.response.header("Access-Control-Allow-Origin", req.get('Origin'));
    ctx.set("Access-Control-Allow-Credentials", true)
    // ctx.response.header("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    // ctx.response.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    // ctx.response.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    await next()
})


let register = new Router();
register.post('/regsiter',async (ctx,next) => {
    let data = ctx.request.body;
    console.log(data);
})



app.use(register.routes())