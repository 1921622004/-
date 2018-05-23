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