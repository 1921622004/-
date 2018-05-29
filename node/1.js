let fs = require('fs');
let http = require('http');
let url = require('url');



let server = http.createServer((req,res)=>{
    console.log(req);
    
    let {
        pathname,
        query
    } = url.parse(req.url);
    console.log(pathname);
    
    if(pathname === '/test'){
        console.log(1);
        
        res.setHeader('content-type','text/css');
        fs.readFile('./1.html',(err,data)=>{
            res.end(data);
            // res.writeHead(200,{
            //     'content-type':'text/html'
            // })
        })
        
    }
   
})
server.listen(3000);