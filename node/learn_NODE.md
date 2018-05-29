#NODE
----

###module.exports
```javascript
var cachedModule = Module._cahed[filename];
if(cachedModule){
    return cachedModule.exports;
}
```
> 重复require('xxx')时，会在内存中缓存下当前这个模块，不论当前文件夹中require多少次，或者在不同的目录中require都是使用当前内存中缓存过的这个模块

###Buffer
Buffer.from(string[,encoding]) :返回一个新建的包含所提供的字符串的副本的buffer  **默认为utf8**
Buffer.from(array)             :返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
Buffer.from(buffer)            :返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。（一个修改不会导致另一个跟着变化）
Buffer.alloc(size[,fill[,encoding]]) :返回一个指定大小的被填满的Buffer实例,如果没有设置fill，默认为0。、

###Stream
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

###FS
fs.readFile(path[,options],callback)
- path:文件路径
- options:   flag文件打开模式
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




###path
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
- '/':  path.resolve()会把这个符号当作当前工作目录的根目录，也就是说只要在*path*片段中碰到以这个符号开头的path片段，
        前面的参数都会被忽略。


###querystring
- querystring.parse(str[,sep[,eq[,options]]])  
    - str      :  要解析的url字符串
    - sep      :  ‘&’
    - eq       :  ‘=’
    - options  :  解码字符串时使用的函数，
    - query.stringify  与其用法相同，方式相反

###url
- url.parse(urlString[,parseQueryString[,slashesDenoteHost]])
    - 返回一个url对象
    - parseQueryString ： 默认false，为true时，解析后返回的对象上query属性会是一个对象

###util
- util.format()  返回一个格式化的字符串
```javascript
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
```
- util.promisify(original)  让一个遵循异常优先的回调风格的函数， 即 (err, value) => ... 回调函数是最后一个参数, 返回一个返回值是一个 promise 版本的函数。

- util.types.is[type](value) : 判断类型


###http
```javascript
http.createServer((req,res) => {
  
  res.end([data][,encoding][,callback])
})
```
- setHeader() 和  writeHead() 的区别
    - response.setHeader(name, value);
    - response.writeHead(statusCode, [statusMessage], [headers])
    - writeHead() 必须在end()之前调用，而且其优先级高于setHeader()







###uuid  &&  formidable





