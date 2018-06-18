# NODE
----

### NPM
[Node Package Manager] ：模块管理的工具
> node安装后，电脑上会自动安装npm，基于npm安装下载JS模块
**常规操作**
```
    npm install xxx 把模块安装到当前目录（在哪个目录下执行的命令，这个目录就是当前目录）
    npm install xxx -g 把模块安装在全局目录下
    npm unistall xxx / npm install xxx -g 卸载模块
    npm view xxx > xxx.version.txt  查看板块的历史版本信息
```
yarn add xxx
nrm ls 查看可用源
nrm use xxx  切换源
bower 从github下载安装

**在本地项目中基于NPM/YARN安装第三方模块**
1. 在本地项目中创建一个package.json的文件
作用：把当前项目所有依赖的第三方模块信息包含模块名称以及版本号等信息都记录下来，可以在这里配置一些可执行的命令脚本
基于yarn会默认生成一个"配置清单"，只是信息没有手动创建的全面
2. 安装
    开发依赖：只有在项目开发阶段依赖的第三方模块
    生产依赖：项目部署实施的时候，也需要依赖的第三方模块
    [npm]
        npm install xxx --save      保存到配置清单的生产依赖中
        npm install xxx --save-dev  保存到开发依赖中
3. 部署的时候跑环境
不要自己一个个的安装 只需要执行 npm install 或者 yarn add 即可，npm会自己先检测目录中是否有package.json文件，如果有的话，会按照文件中的配置清单依次安装

**安装在本地和全局的区别**
```
[安装在全局的特点]
    1. 所有的项目都可以使用这个模块
        -> 容易导致版本冲突
        -> 安装在全局的模块，不能基于CommonJS模块规范调取使用（也就是不能再JS中通过require调取使用）

[安装在本地的特点]
    2. 只能当前项目使用这个模块
        -> 不能直接的使用命令操作（安装在全局可以使用命令）


为啥安装在全局下可以使用命令
 npm root /-g 查看本地项目或者全局环境下，npm的安装目录
  安装在全局目录下的模块，大部分都会生成一个xxx.cmd的文件，只要有这个文件，那么xxx就是一个可执行的命令

能否即安装在本地，又可以使用命令行
    可以，但是需要配置package.json中的scripts
    1. 把模块安装在本地，如果是支持命令操作的（会在node_modules中的bin问生成xxx.cmd的命令文件，只不过这个文件无法在全局下执行，也就是不能直接用命令）
    2. 在package.json的scripts中配置需要执行的命令脚本
        "scripts":{
            "awesome":"npm -v"   属性名自己设置即可，属性值时需要执行的脚本，根据需要自己编写（可以配置很多命令）
        }
    3. npm run awesome / yarn awesome 这样的操作就是把配置的脚本执行
        -> 首先到配置清单的scripts中查找
        -> 找到把后面对应的属性值（执行脚本）执行
        -> 执行脚本的时候会在本地node_modules中的bin文件夹中查找，没有的话，再想npm安装的全局目录下查找
```



###node做后台的优势和特点
- 单线程
- 基于V8引擎渲染：快
- 非阻塞异步I/O操作：I/O（input/output）对文件的读写
- event-driven：事件驱动





### module
- 每一个模块都默认传了5个参数
    - exports       导入      模块中的this就是exports
    - require       导出
    - module        寻找模块经历的路径
    - __filename    文件的绝对路径(包含文件名)
    - __dirname     文件的绝对目录

```javascript
(function(exports,require,module,__filename,__dirname){
    var greet = function(){
        console.log('hello')
    };
    module.exports = exports =  greet;
})
fn(module.exports,require,module,filename,dirname)
return module.exports
```

**分类**
1. 内置模块 node自带的模块，自带的模块不需要安装直接require导入，路径不需要./，直接模块名字就可以
2. 自定义模块 自己写的模块，使用require需要带./
3. 第三方模块 需要安装 安装的第三方模块都在node_modules文件夹里面
    导入的时候不需要./ 
    1. 先看是不是内置模块 不是再找第三方模块
    2. 找安装的node_modules的顺序是按照module.path顺序找的

> 导入的文件如果省略后缀，文件后缀的顺序会按照下面的extensions来匹配
> extensions: { '.js': [Function], '.json': [Function], '.node': [Function] }

```javascript
var cachedModule = Module._cahed[filename];
if(cachedModule){
    return cachedModule.exports;
}
```
> 重复require('xxx')时，会在内存中缓存下当前这个模块，不论当前文件夹中require多少次，或者在不同的目录中require都是使用当前内存中缓存过的这个模块

**CommonJS**
- CommonJS规定，每一个JS都是一个单独的模块（模块时私有的，里面涉及的值和变量以及函数等都是私有的，和其它JS文件中的内容是不冲突的）
- CommonJS中可以允许模块中的方法户向的调用 [导出]
   - CommonJS给每一个模块都设置了内置的变量/属性/方法
   - Module:代表当前这个模块对象
   - module.exports:模块的这个 *属性* 是用来导出属性方法的
   - exports:是内置的一个 *变量* ，也是用来导出当前模块属性方法的，虽然和module.exports不是一个对象，但是对应的值是同一个
- [导入]
    - 

- CommonJS特点
    - 所有代码都运行在模块作用域，不会污染全局作用域（每一个模块都是私有的，包括里面所有的东西也都是私有的，不会和其他模块产生干扰）
    - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就会被缓存了，以后在加载，就直接读取缓存结果，要想让模块再次运行，必须清除缓存（为了保证性能，减少模块代码重复执行的次数）
    - 模块加载的顺序，按照其在代码中出现的顺序，CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作

### Buffer
- Buffer.from(string[,encoding]) :返回一个新建的包含所提供的字符串的副本的buffer  **默认为utf8**
- Buffer.from(array)             :返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(buffer)            :返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。（一个修改不会导致另一个跟着变化）
- Buffer.alloc(size[,fill[,encoding]]) :返回一个指定大小的被填满的Buffer实例,如果没有设置fill，默认为0。、

### Stream
> Stream类继承自EventEmitter
fs.createReadStream(pathname,options): 创建一个可读流，{highWaterMark：默认64*1024};
数据流传递给消费者时触发'data'事件。给回调函数传递一个字符串
```
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
```
'end' 事件将在流中再没有数据可供消费时触发。


fs.createWriteStream(pathname,options):

**pipe原理**
```
 function pipe(source,target){
    let rs = fs.createReadStream(source,{highWaterMark:4});
    let ws = fs.createWriteStream(target,{highWaterMark:1});
    //开启可读流
    rs.on('data',function(chunk){
        if(ws.write(chunk) === false){
            //可写流不能再继续写入了
            //暂停读取
            rs.pause()
        }
    })
    ws.on('drain',function(){
        //当当前读入的内容都写入了文件中，调用继续读取
        rs.resume() 
    });
    rs.ond('end',function(){
        //当读取完毕，强制将内存中未写完的内容写入到文件当中，关闭文件
        ws.end();
        //使用end方法后，表明接下来没有数据要写入可写流，在调用 ws.write()方法会报错
    })
 }

 pipe('./1.txt','./2.txt')
```
readable.pipe(destination[, options])   : 绑定一个 Writable 到 readable 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷（overwhelmed）。
options:   end: 默认为true  在结束时调用 可写流writer.end()方法。

### FS
fs.mkdir(path[,callback])  创建目录
fs.appendFile(path[,callback(err)])  异步追加数据 没有文件则创建

fs.readFile(path[,options],callback)
- path:文件路径
- options:  flag文件打开模式
            encoding字符编码
- callback:  回调函数  其中data是文件的内容

fs.readFileSync(path[,options])   同步读取文件

fs.writeFileSync(file,data[,options],callback)  
- file  文件名或者文件描述符
- data


fs.rename()
flag：
r	以读取模式打开文件。如果文件不存在抛出异常。
r+	以读写模式打开文件。如果文件不存在抛出异常。
rs	以同步的方式读取文件。
rs+	以同步的方式读取和写入文件。
w	以写入模式打开文件，如果文件不存在则创建。
wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
w+	以读写模式打开文件，如果文件不存在则创建。
wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
a	以追加模式打开文件，如果文件不存在则创建。
ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
a+	以读取追加模式打开文件，如果文件不存在则创建。
ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。

--------------

**fs.stats**
fs.stat(pathname,(err,stats)=>{})
stats.isDirectory()  是否是文件夹
stats.isFile()       是否是文件
stats.size           文件的字节大小
stats.birthtime/ctime/mtime/atime  文件的创建时间/最后一次被改变的时间/最后一次被修改的时间/最后一次被访问的时间


> fs.open()  当你要进行不同的重要操作时，同时不希望文件关闭，应该选择用open方法  同时，此方法会分配一个新的文件描述符
> fs.readFile()  是要将读取的文件内容完整读入缓存区，再从该缓存区读取文件内容，文件不完整读完，不会返回任何数据，也就是不会给回调函数传递参数     而且这种方式会在读取文件完成后，自动关闭文件
> fs.createReadStream  返回的是可读流，而且利用pipe可以直接将当前读取的这部分可读流传入服务器的响应回调函数中（也就是res），这样客户端就可以立马开始接受到数据不管当前这个文件有多大




### path
- path.dirname(path)  返回一个path的目录名
```javascript
path.dirname('/a/b/c/d');
//  '/a/b/c'
```
- path.join([...paths])  使用平台特定的分隔符将给定的*path*片段拼接在一起。

- path.parse(pathname)   返回一个对象
```javascript
path.parse('C:\\path\\dir\\file.txt');
// 返回:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```
- path.resolve()  
    - 如果没有传递参数，会返回当前工作目录的绝对路径
    - 给定path片段后，会从右向左处理，直到构造成一个绝对路径。
    - 如果处理完所有path片段，仍然没有没有生成一个绝对路径，则当前目录会被用上

**path.join()和path.resolve()的区别**
- path.join()只是一个函数  path.resolve()会返回当前工作目录的绝对路径
- path.join()只是把当前传递进去的*path*片段之间用当前操作系统指定的分隔符拼接在一起
- path.resolve([...path]) 会从右向左一直尝试去拼接出一个绝对路径。
- '/':  path.resolve()会把这个符号当作当前工作目录的根目录，也就是说只要在*path*片段中碰到以这个符号开头的path片段，前面的参数都会被忽略。


### querystring
- querystring.parse(str[,sep[,eq[,options]]])  
    - str      :  要解析的url字符串
    - sep      :  ‘&’
    - eq       :  ‘=’
    - options  :  解码字符串时使用的函数，
    - query.stringify  与其用法相同，方式相反

### url
- url.parse(urlString[,parseQueryString[,slashesDenoteHost]])
    - 返回一个url对象
    - parseQueryString ： 默认false，为true时，解析后返回的对象上query属性会是一个对象
```javascript
Url {
  protocol: 'https:',  //协议
  slashes: true,    
  auth: null, 
  host: 'www.baidu.com:80',  //域名+端口
  port: '80',             
  hostname: 'www.baidu.com', //域名
  hash: '#asdff',            //哈希
  search: '?from=qq&id=222',
  query: {                   //问号传参解析成对象
      from:qq,
      id:2222
  },
  pathname: '/user/login',   //路径
  path: '/user/login?from=qq&id=222', 
  href: 'https://www.baidu.com:80/user/login?from=qq&id=222#asdff' 
}
```

### util
- util.format()  返回一个格式化的字符串
```javascript
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
```
- util.promisify(original)  让一个遵循异常优先的回调风格的函数， 即 (err, value) => ... 回调函数是最后一个参数, 返回一个返回值是一个 promise 版本的函数。

- util.types.is[type](value) : 判断类型


### http
```javascript
http.createServer((req,res) => {
  res.end([data][,encoding][,callback])
})
```
- setHeader() 和  writeHead() 的区别
    - response.setHeader(name, value);
    - response.writeHead(statusCode, [statusMessage], [headers])
    - writeHead() 必须在end()之前调用，而且其优先级高于setHeader()



### uuid  &&  formidable



# Express
> app监听函数上，扩展了很多方法，包括get、post、delete、put，RESTful风格中的动词
> app.方法名('路径名',方法)
> 从上到下匹配，如果匹配到了并且相应结束，就不会继续向下走
> express重点是扩展了 req，res的属性。

**express路由**
必须method和path全都匹配上执行对应的callback
```javascript
app[method](path,function(){});
app.all("*",function(){});
```

**路径参数路由**
把匹配到的结果生成一个对象放到req.params上
```
app.get('/user/:id/:name')
```

*实现*
```javascript
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
```

**req**
- req.params   路径参数
- req.url      整个的路径
- req.path     pathname路径 不包括问号
- req.headers  请求头
- req.method   请求方法
- req.query    请求参数

**res**
- res.json()        返回json
- res.sendFile()    返回文件    不能通过../查找  root不支持   像查找可以使用path模块
- res.sendStatus()
- res.send()




### 中间件
> 当我们访问到最终目标之前执行的内容
*功能及特点*
- next决定是否继续执行
- 处理公共逻辑
- 可以进行权限判断
- 可以对req，res的属性进行扩充
- 中间件放在要执行的路径的上面
- 中间件默认情况下都匹配，也可以执行路径。
- 错误中间件，在页面的最后，参数是4个，err，req，res，next

*next*
- next函数主要作用是将负责权交给下一个中间件，如果当前像next()中传入参数（除了‘route’字符串），会认为当前请求有错误的输出，因此跳过后续其他非错误处理和路由/中间件函数，如果需做特殊处理，

```
let expres = require('express');
let app = express();
app.use([path,](req,res,next) => {

})
```



**body-parser**
```javascript
//解析表单格式  把表单内的数据  解析后放在req.body上
bodyParser.urlencoded({extended:false});   
//解析json格式， 把json字符串 转化为对象  解析后放在req.body上
bodyParser.json()
```



###**`MySQL`**
 启动mysql服务
- 通过控制servers.msc,在服务中查看mysql服务的名字使用命令可以开关mysql服务,以管理员身份运行cmd
    ```
    net start mysql57
    net stop mysql57
    ```

mysql创建数据库
```
create DATABASE tb2;
SHOW DATABASES;
```

使用数据库
```
use tb2;
select database();
```

创建数据表
```
create table user(
	id TINYINT not null PRIMARY key auto_increment,
	username varchar(20) not null
);
show create TABLE user; 显示创建的表代码
show COLUMNS from user; 显示当前表的列
```

查找表
```
select * from user;
```

像表中插入内容
```
insert user(username) value ('jw');
```


添加主键约束
```
alter table student change id id int not null primary key ;
alter table student add CONSTRAINT student_id PRIMARY KEY (id);
```

添加外键约束
```
create table student(
	id int not null PRIMARY KEY auto_increment,
	name varchar(20),
	pid int,
	FOREIGN KEY (pid) REFERENCES province(id) 
);
alter table student add FOREIGN key (pid) REFERENCES province(id);
```
添加唯一约束
```
alter table student add CONSTRAINT UNIQUE (username);
```

添加默认约束
```
alter table student alter number set DEFAULT 30;
```

修改列的顺序
```
alter table student MODIFY id int not null AFTER username;
```

修改列名
```
alter table province change COLUMN city province varchar(20)
```

删除列
```
alter table student drop COLUMN id;
```

删除主键
```
alter table student drop primary key;
```

删除外键
```
alter table student drop FOREIGN key student_ibfk_1
```

删除默认约束
```
alter table student alter number drop default ;
```