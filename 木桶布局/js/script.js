/**
 * 1.ajax获取数据
 * 2.每张图片进行加载，但不添加到页面中
 * 3.计算每一张图片的长宽比
 * 4.这一行的高度就是第一张图片的高度，然后计算出这一行的长宽比。
 * 5.然后依次拿出每一张图片，将图片高度都设为300（这个数值是可以改变的），如果当前的行宽加上
 *  （这张图片如果拉伸到那个固定高度后的宽度）大于总行宽的话，就停止循环，
 *   把这张图片单独拿出来，同时计算当总宽度/当前行宽，然后当前的这些图片全部拉伸到这个高度
 * 6.下一行就把上一张单独拿出来的图片作为第一张照上面的方法进行渲染
 */


/**
 * 第二次循环的list
 * 第一次剩下的list
 * 
 * 
 */


/**
 * 
 */
let wrapper = document.getElementsByClassName('wrapper')[0],
    rowWidth = parseFloat(window.getComputedStyle(wrapper, null)['width']),
    imgWrapper = document.querySelector('.imgWrapper'),
    page = 0,
    clientH = document.documentElement.clientHeight || document.body.clientHeight;

console.log(wrapper, rowWidth);


class Barrel {
    constructor(initHeight) {
        this.initHeight = initHeight || 300;
        this.imgList = [];
        this.leftAry = [];
        this.readyToRender = [];
        this.helperNum = 0;
        this.curWidth = 0;
        this.isScrolling = false;
        this.handleFN();
        this.moreData();
    }

    moreData() {
        window.onscroll = () => {
            if (this.isScrolling) return;
            let scrollT = document.documentElement.scrollTop || document.body.scrollTop,
                curH = document.documentElement.scrollHeight || document.body.scrollHeight;

            if (scrollT + clientH + 100 > curH) {
                this.isScrolling = true;
                this.handleFN()
            }
        }
    }

    handleFN() {
        if (this.imgList.length > 0) {
            this.flag = true;
        }
        this.promise = this.getData();
        this.promise.then(() => {
            debugger;
            page++;
            this.a()
        })
        this.isScrolling = false;
    }

    getData() {
        return new Promise((resolve, reject) => {
            let url = `json/data.json?page=${page}`
            this.addList = null;
            let xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    this.addList = JSON.parse(xhr.responseText);
                    this.addList.sort((a, b) => {
                        return Math.random() - 0.5
                    })
                    this.imgList = this.leftAry.concat(this.addList);
                    resolve();
                }
            }
            xhr.send(null)
        })
    }

    a() {
        debugger;
        let i = 0;
        // if(this.flag){
        //     i = this.helperNum;
        // }
        // this.flag = false;
        let ary = []
        if(this.addList.length>0){
            ary =  this.addList;
        }else{
            ary = this.imgList;
        }
        
        for (; i < ary.length - this.helperNum; i++) {
            let curImg = ary[i],
                _width = curImg.width / curImg.height * this.initHeight;
            if (this.curWidth + _width >= rowWidth) {
                this.b();
                break;
            } else {

                this.curWidth += _width;
                curImg.height = this.initHeight;
                curImg.width = _width;

    
                this.readyToRender.push(ary.splice(0, 1)[0]);
                if (ary.length === 0) {
                    //这里i每次都回变回0应该从上一次开始
                    this.flag = true;
                    this.leftAry = this.readyToRender.slice(0);
                    this.helperNum = this.leftAry.length;
                    return
                }
                i--;
            }
        }

    }

    b() {
        let readyToRender = this.readyToRender,
            scale = rowWidth / this.curWidth,
            str = ``,
            oDiv = document.createElement('div');
        oDiv.className = 'imgWrapper';
        for (let i = 0; i < readyToRender.length; i++) {
            let obj = readyToRender[i];
            obj.width = obj.width * scale;
            obj.height = obj.height * scale;
            str += `
            <a href=${obj.link}>
            <img src=${obj.pic} style="width:${obj.width + 'px'};height:${obj.height + 'px'}">
            </a>`
        }
        oDiv.innerHTML = str;
        wrapper.appendChild(oDiv);
        this.readyToRender = [];
        this.curWidth = 0;
        this.a();
        this.flag = true;
    }

}
new Barrel(200, 20)