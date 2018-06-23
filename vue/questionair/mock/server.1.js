/**
 * 还是先用express吧 暂时搁置
 */

const Koa = require('koa');
const Router = require('koa-router');
const util = require('util');
const queryString = require('querystring');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
let app = new Koa();

app.listen(3000);
// body-parser中间件
// 设置跨域
app.use(async (ctx, next) => {
  ctx.userData = JSON.parse(await readFile('./data/user.json'))
  await next()
})

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header['origin'])
  ctx.set("Access-Control-Allow-Credentials", true)
  ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  if (ctx.request.method === 'OPTIONS') {
    ctx.body = 'Current services support cross domain requests!'
  }
  await next()
})
app.use(async (ctx, next) => {
  let str = '';
  if (ctx.request.method === 'POST') {
    ctx.req.on('data', chunk => {
      str += chunk;
    })
    ctx.req.on('end', async () => {
      ctx.myBody = queryString.parse(str);
      await next()
    })
  } else {
    await next()
  }

})



// let register = new Router();

// register.post('/register',async (ctx,next) => {    
//     let data = ctx.myBody;
//     let userData = ctx.userData;
//     userData.push(data);
//     writeFile('./data/user.json',JSON.stringify(userData))
//     ctx.response.status = 200;
//     ctx.body = {
//         code:0,
//         message:'ok'
//     }
//     await next()
// })
// app.use(register.routes())

app.use(async ctx => {
  if (ctx.request.method === 'POST') {
    if (ctx.request.url === '/register') {
        let data = ctx.myBody;
        let userData = ctx.userData;
        userData.push(data);
        console.log(userData);
        writeFile('./data/user.json',JSON.stringify(userData));
        ctx.body = 'ok'
    }
  }
})
