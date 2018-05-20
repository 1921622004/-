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
            this.width = this.ele.offsetWidth;
            this.height = this.ele.offsetHeight;

            //获取初始位置
            this.positionL = this.ele.offsetLeft;
            this.positionT = this.ele.offsetTop;


            //事件绑定
            this.closeFn();
            this.resizeFn();
        }
        resizeFn() {
            // debugger;
            this._resolveDirection = this.resolveDirection.bind(this);
            this.ele.addEventListener('mousemove', this._resolveDirection, false)
            this.ele.addEventListener('mousedown', (e) => {
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
            debugger;
            if (e.target.className === 'float') {
                this.curMoveX = e.clientX;
                this.curMoveY = e.clientY;
                let x = this.curMoveX,
                    y = this.curMoveY,
                    l = this.positionL,
                    t = this.positionT,
                    w = this.width,
                    h = this.height;
                //在两侧边框
                if (((x - l) >= (w - 10) && (x - l) <= w) ||
                    ((x - l) > -2 && (x - l) < 10)) {
                    //在两侧中间区域
                    if (((y - t) > 10) && ((y - t) < (h - 10))) {
                        this.ele.style.cursor = 'ew-resize';
                        this.scaleDirection = 'ew';
                    } else if ((y - t) < 10) {
                        //在上边框
                        //在左上角
                        if ((x - l) < 10) {
                            this.ele.style.cursor = 'nwse-resize';
                            this.scaleDirection = 'nwse';
                        } else {
                            this.ele.style.cursor = 'nesw-resize';
                            this.scaleDirection = 'nesw';
                        }
                        //在下边框
                    } else {
                        if ((x - l) < 10) {
                            this.ele.style.cursor = 'nesw-resize';
                            this.scaleDirection = 'nesw';
                        } else {
                            this.ele.style.cursor = 'nwse-resize';
                            this.scaleDirection = 'nwse'
                        }
                    }
                } else {
                    console.log(this);
                    
                    this.ele.style.cursor = 'ns-resize';
                    this.scaleDirection = 'ns'
                }
            }
        }
    }

    let oUl = document.getElementById('ul'),
        mask = document.getElementById('mask'),
        maskOn = false,
        divS = null;

    let resizeStartFn = function (e) {
        console.log(e);

        this.startX = e.clientX;
        this.startY = e.clientY;
        let _resizingFn = resizingFn.bind(this);
        this.ele.removeEventListener('mousemove', this._resolveDirection);
        document.addEventListener('mousemove', _resizingFn, false);
        document.addEventListener('mouseup',()=>{
            this.width = this.curWidth;
            this.height = this.curHeight;
            document.removeEventListener('mousemove',_resizingFn);
            this.ele.addEventListener('mousemove', this._resolveDirection, false)
        })
    }

    let resizingFn = function (e) {
        e.preventDefault();
        let curX = e.clientX,
            curY = e.clientY;
        debugger;
        
        this.curWidth = this.width + (curX - this.startX);
        this.curHeight = this.height + (curY - this.startY);
        switch (this.scaleDirection) {
            case 'ew':
                this.ele.style.width = this.curWidth + 'px';
                break;
            case 'ns':
                this.ele.style.height = this.curHeight + 'px';
                break;
            default:
                this.ele.style.width = this.curWidth + 'px';
                this.ele.style.height = this.curHeight + 'px';
                break;
        }

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
