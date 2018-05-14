$(function () {
    //获取所有img
    let $container = $('#container'),
        containerL = $container.offset()['left'],
        containerT = $container.offset()['top'],
        $imgList = $container.children('img');
    //获取所有img现有位置
    let leftAry = [],
        topAry = [];
    $imgList.each((index, item) => {
        let l = parseFloat($(item).css('left')),
            t = parseFloat($(item).css('top'));
        $(item).attr('initL', l)
            .attr('initT', t);
        if (leftAry.indexOf(l) < 0) {
            leftAry.push(l);
        }
        if (topAry.indexOf(t) < 0) {
            topAry.push(t);
        }
    });

    
    //鼠标移动
    let mouseMove = function (e) {
        let $this = $(this);
        let curL = e.clientX - Number($this.attr('initX')) + Number($this.attr('initL')),
            curT = e.clientY - Number($this.attr('initY')) + Number($this.attr('initT'));
        $this.attr('curL', curL).attr('curT', curT);
        $this.css({
            left: curL + 'px',
            top: curT + 'px'
        })
    }

    //鼠标抬起
    let mouseUp = function (e) {
        //这里的this是当前被拖动的图片
        let $this = $(this),
            cX = e.clientX - containerL,
            cY = e.clientY - containerT;
            $container.off('mousemove', $this._mouseMove).off('mouseup', $this._mouseUp);

        //以下两个循环为了判断当前拖拽的图片应该运动到的位置
        for (let i = 0; i < leftAry.length; i++) {
            //循环到最后一项的时候，直接判断为最后的位置
            if(i === leftAry.length-1){
                cX= leftAry[i];
                break;
            }
            if(cX>=leftAry[i] && cX<=leftAry[i+1]){
                cX = leftAry[i];
                break;
            }
        }
        for (let j = 0; j < topAry.length; j++) {
            if(j === topAry.length-1){
                cY = topAry[j];
                break;
            }
            if(cY>=topAry[j] && cY<=topAry[j+1]){
                cY = topAry[j];
                break;
            }
        }
        //根据图片被拖拽到的位置判断出应该与哪一张图片互换位置
        let hoverOn;
        $imgList.each((index,item)=>{
            let $item = $(item);
            if(parseFloat($item.css('left')) === cX && parseFloat($item.css('top')) === cY){
                hoverOn = item;
            }
        });
        /**
         * 这里获取被拖拽图片的自定义属性 初始的位置 
         * 同时更改要运动的图片的自定义属性 厨师位置
        */
        let thisInitL = $this.attr('initL'),
            thisInitT = $this.attr('initT');
        $(hoverOn).stop().animate({
            left:thisInitL,
            top:thisInitT
        }).attr('initL',thisInitL).attr('initT',thisInitT);
        /**
         * 同时将本身的初始位置的自定义属性  重新修改
         */
        $this.css({
            left:cX + 'px',
            top:cY + 'px',
            zIndex:0
        }).attr('initL',cX).attr('initT',cY);
    }

    //运动所需要的变量

    //鼠标落下时
    $imgList.each((index, item) => {
        $(item).on('mousedown', function (e) {
            //阻止图片拖拽默认行为
            e.preventDefault();
            let $this = $(this);
            $this.css('zIndex', 1)
                //给当前拖拽的这张图片设置自定义属性记录初始位置
                .attr('initX', e.clientX)
                .attr('initY', e.clientY);
            //利用bind方法 给container绑定方法 事件委托防止鼠标运动过快
            $this._mouseMove = mouseMove.bind(this),
            $this._mouseUp = mouseUp.bind(this);
            $container.on('mousemove', $this._mouseMove).on('mouseup', $this._mouseUp);
        })
    })
})