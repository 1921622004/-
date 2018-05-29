class EventEmitter {
    constructor() {
        this.listener = {}
    }
    on(type, listener) {
        if (!this.listener[type]) {
            this.listener[type] = [];
        }
        this.listener[type].push(listener);
    }
    off(type, listener) {
        let ary = this.listener[type];
        ary.forEach((item, index) => {
            if (obj === listener) {
                ary[index] = null;
            }
        })
    }
    emit(type, param) {
        let ary = this.listener[type];
        ary.forEach(obj => {
            obj && obj.call(this, param)
        });
    }
    once(type, listener) {
        let fn = () => {
            listener()
            this.off(type, fn)
        }
        this.on(type, fn);
    }
}


let dragRender = function () {

    class Drag extends EventEmitter {
        constructor(ele) {
            super()
            // debugger;
            //获取所需元素
            this.ele = ele;
            this.closeBtn = this.ele.querySelector('.closeBtn');

            //获取宽高
            this.curWidth = this.width = this.ele.offsetWidth;
            this.curHeight = this.height = this.ele.offsetHeight;

            //获取初始位置
            this.curLeft = this.positionL = this.ele.offsetLeft;
            this.curTop = this.positionT = this.ele.offsetTop;


            //事件绑定
            this.closeFn();
            this.resizeFn();

            this.isRun = false;
        }
        resizeFn() {
            // debugger;
            this._resolveDirection = this.resolveDirection.bind(this);
            this.ele.addEventListener('mousemove', this._resolveDirection, false);
            this.ele.addEventListener('mousedown', e => {

                this.emit('mousedown', e)
            }, false);
        }
        closeFn() {
            this.closeBtn.onclick = () => {
                mask.removeChild(this.ele);
            }
        }

        resolveDirection(e) {
            e.preventDefault();
            if (e.target.className === 'float') {
                this.curMoveX = e.clientX;
                this.curMoveY = e.clientY;
                let x = this.curMoveX,
                    y = this.curMoveY,
                    l = this.positionL,
                    t = this.positionT,
                    w = this.width,
                    h = this.height;

                    //在左上角
                if ((x - l) <= 10 && (y - t) <= 10) {
                    this.ele.style.cursor = 'nwse-resize';
                    this.scaleDirection = 'leftTop'
                    //左侧边框中间
                } else if ((x - l) <= 10 && (y - t) > 10 && (y - t) < (h - 10)) {
                    this.ele.style.cursor = 'ew-resize';
                    this.scaleDirection = 'leftMiddle'
                    //左下角    
                } else if ((x - l) <= 10 && (y - t) > (h - 10)) {
                    this.ele.style.cursor = 'nesw-resize';
                    this.scaleDirection = 'leftBot';
                    //下边框中间
                } else if ((x - l) > 10 && (x - l) < (w - 10) && (y - t) > (h - 10)) {
                    this.ele.style.cursor = 'ns-resize';
                    this.scaleDirection = 'botMiddle';
                    //右下角
                } else if ((x - l) >= (w - 10) && (y - t) > (h - 10)) {
                    this.ele.style.cursor = 'nwse-resize';
                    this.scaleDirection = 'botRight';
                    //右边框中间
                } else if ((x - l) >= (w - 10) && (y - t) > 10 && (y - t) <= (h - 10)) {
                    this.ele.style.cursor = 'ew-resize';
                    this.scaleDirection = 'rightMiddle';
                    //右上角
                } else if ((x - l) >= (w - 10) && (y - t) <= 10) {
                    this.ele.style.cursor = 'nesw-resize';
                    this.scaleDirection = 'rightTop';
                    //上边框中间
                } else if ((x - l) > 10 && (x - l) < (w - 10) && (y - t) < 10) {
                    this.ele.style.cursor = 'ns-resize';
                    this.scaleDirection = 'topMiddle';
                }
            }
        }
    }

    let oUl = document.getElementById('ul'),
        mask = document.getElementById('mask'),
        maskOn = false,
        divS = null,
        positionAry = [];

    let resizeStartFn = function (e) {
        console.log(this);
        
        console.log(e);

        this.startX = e.clientX;
        this.startY = e.clientY;

        if (e.target.nodeName === 'IMG') {
            this.isRun = true;
        }

        let tempFn = ()=>{
            console.log(this);
            
            this.width = this.curWidth;
            this.height = this.curHeight;
            this.positionL = this.curLeft;
            this.positionT = this.curTop;
            this.isRun = false;
            document.removeEventListener('mousemove', _resizingFn);
            this.ele.addEventListener('mousemove', this._resolveDirection, false);
            let obj = {
                    ele: this.ele,
                    top: this.positionT,
                    left: this.positionL,
                    right: this.positionL + this.width,
                    bot: this.positionT + this.height
                },
                alreadyHave = false,
                endL = this.positionL,
                endT = this.positionT;
// debugger
            if (positionAry.length > 0) {
                positionAry.forEach((item, index) => {
                    if(item.ele === obj.ele) return;
                    if (Math.abs(item['right'] - obj.left) < 30) {
                        endL = item['right'];
                    } else if (Math.abs(item['bot'] - obj.top) < 30) {
                        console.log(111);
                        
                        endT = item['bot'];
                    } else if (Math.abs(item['left'] - obj.right) < 30) {
                        endL = item['left'] - this.width;
                    } else if (Math.abs(item['top'] - obj.bot) < 30) {
                        endT = item['top'] - this.height;
                    }
                })
                this.ele.classList.add('moving');
                this.ele.style.left = endL ? endL + 'px' : this.positionL;
                this.ele.style.top = endT ? endT + 'px' : this.positionT;
                obj.top = endT;
                obj.bot = endT + this.height;
                obj.left = endL;
                obj.right = endL + this.width;
                this.positionL = endL ? endL : this.positionL;
                this.positionT = endT ? endT : this.positionT;
            }

            // debugger


            positionAry.forEach(item => {
                if (item.ele === obj.ele) {
                    alreadyHave = true;
                    item.left = obj.left;
                    item.top = obj.top;
                    item.bot = obj.bot;
                    item.right = obj.right;
                }
            })
            if (!alreadyHave) {
                positionAry.push(obj);
            }
            console.log(positionAry);
            this.ele.classList.remove('moving');
            document.removeEventListener('mouseup',tempFn);
        }

        let _resizingFn = resizingFn.bind(this);
        this.ele.removeEventListener('mousemove', this._resolveDirection);
        document.addEventListener('mousemove', _resizingFn, false);
        document.addEventListener('mouseup', tempFn)
    }



    let resizingFn = function (e) {
        e.preventDefault();
        if (this.isRun) {
            leftChangeFn.call(this, e);
            topChangeFn.call(this, e);
            return;
        }
        if (!this.isRun) {
            switch (this.scaleDirection) {
                case 'leftTop':
                    widthChangeFn.call(this, e);
                    heightChangeFn.call(this, e);
                    leftChangeFn.call(this, e);
                    topChangeFn.call(this, e);
                    break;
                case 'leftMiddle':
                    widthChangeFn.call(this, e);
                    leftChangeFn.call(this, e);
                    break;
                case 'leftBot':
                    widthChangeFn.call(this, e);
                    heightChangeFn.call(this, e);
                    leftChangeFn.call(this, e);
                    break;
                case 'botMiddle':
                    heightChangeFn.call(this, e);
                    break;
                case 'botRight':
                    widthChangeFn.call(this, e);
                    heightChangeFn.call(this, e);
                    break;
                case 'rightMiddle':
                    widthChangeFn.call(this, e);
                    break;
                case 'rightTop':
                    widthChangeFn.call(this, e);
                    heightChangeFn.call(this, e);
                    topChangeFn.call(this, e);
                    break;
                case 'topMiddle':
                    heightChangeFn.call(this, e);
                    topChangeFn.call(this, e);
                    break;
            }
        }
    }

    //ele's width changing function
    let widthChangeFn = function (e) {
        let curX = e.clientX;
        let flag = 1;
        if (this.scaleDirection.indexOf('left') >= 0) {
            flag = -1
        }
        this.curWidth = this.width + (curX - this.startX) * flag;
        this.ele.style.width = this.curWidth + 'px';
    }

    //ele's height changing function
    let heightChangeFn = function (e) {
        let curY = e.clientY;
        let flag = 1;
        if (this.scaleDirection.indexOf('op') >= 0) {
            flag = -1
        }
        this.curHeight = this.height + (curY - this.startY) * flag;
        this.ele.style.height = this.curHeight + 'px';
    }

    //ele's left changing function
    let leftChangeFn = function (e) {
        let curX = e.clientX;
        this.curLeft = this.positionL + (curX - this.startX);
        this.ele.style.left = this.curLeft + 'px';
    }

    //ele's top changing function
    let topChangeFn = function (e) {
        let curY = e.clientY;
        this.curTop = this.positionT + (curY - this.startY);
        this.ele.style.top = this.curTop + 'px';

    }

    //handler for ul
    let handleUL = function () {
        oUl.onclick = function (e) {
            let target = e.target;
            console.dir(target);
            if (target.nodeName === 'IMG') {
                if (!maskOn) {
                    mask.style.display = 'block';
                }
                maskOn = true;
                let oDiv = document.createElement('div'),
                    imgSrc = target.src;
                oDiv.className = 'float';
                oDiv.innerHTML = `<img src="${imgSrc}" alt=""><a href="javascript:;" class="closeBtn"> X </a>`
                mask.appendChild(oDiv);
                let a = new Drag(oDiv);
                a.on('mousedown', resizeStartFn)
            }
        }
    }
    return {
        init: function () {
            handleUL()
        }
    }
}()

dragRender.init()
