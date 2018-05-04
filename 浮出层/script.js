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