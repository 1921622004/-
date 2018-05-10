$(function () {
    let $show = $("#show"),
        $mask = $("#mask"),
        $float = $("#float"),
        $closeBtn = $(".close"),
        $title = $("#title"),
        clientH = document.documentElement.clientHeight || document.body.clientHeight,
        clientW = document.documentElement.clientWidth || document.body.clientWidth,
        floatH = $float.outerHeight(),
        floatW = $float.outerWidth(),
        minL = 0,
        minT = 0,
        maxL = clientW - floatW,
        maxT = clientH - floatH,
        initX,
        initY,
        middleOL = (clientW - floatW) / 2,
        middleOT = (clientH - floatH) / 2;
    console.log(floatH, floatW);

    $show.on('click', () => {
        $mask.css('display', 'block');
        $float.css('left', (clientW - floatW) / 2 + 'px');
        $float.css('top', (clientH - floatH) / 2 + 'px');
    });
    $closeBtn.on('click', () => {
        $mask.css('display', 'none');
    })
    $title.on('mousedown', function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        initX = e.clientX;
        initY = e.clientY;
        middleOL = $float.offset()['left'];
        middleOT = $float.offset()['top'];
        document.onmousemove = mouseMoveFn;
        document.onmouseup = mouseUpFn;
    });
    mouseMoveFn = function (e) {
        e = e || window.event;
        let curL = e.clientX - initX + middleOL,
            curT = e.clientY - initY + middleOT;
        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
        $float.css('left', curL + 'px');
        $float.css('top', curT + 'px');
    };
    mouseUpFn = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
    }
})


//拖拽的整体原理：
//   1.鼠标按下时，获取初始的clientX和clientY还有当前元素的初始offsetLeft和offsetTop值，
//     然后给鼠标移动和鼠标送开始事件绑定方法
//   2.鼠标移动时，获取当前clientX和clientY值，用这个值减去初始值再加上初始的Offset值就
//     是当前元素要运动到哪里的值，再做边界判断。（为了防止鼠标移动过快造成鼠标焦点丢失的
//     问题，选择给document进行绑定）
//   3.鼠标松开时，将当前绑定的方法取消绑定，否则会出现鼠标松开后，元素仍然跟着鼠标进行运动。