let rotate = function (cur,next) {
        next *= 90;
        cur *= 90;
    let step = (next - cur) / 60,
        usedTime = 0,
        timer = setInterval(() => {

            usedTime += 17;
            if (usedTime > 1000) {
                this.css('transform', 'rotate(' + next + 'deg)');
                clearInterval(timer);
                return;
            }
            cur += step;
            this.css('transform', 'rotate(' + cur + 'deg)');
        }, 17)
}
$.fn.extend({
    rotate: rotate
})


$(function () {
    let $box = $("#box"),
        $head = $("#head"),
        $order = $("#order"),
        $value = $("#value"),
        randomRotate = Math.floor(Math.random() * 4);

    let GO = {
        go0: function () {
            let curT = parseFloat($box.css('top'))
            let nextT = curT - 40;
            if (nextT < 0){
                return true
            }
            $box.stop().animate({
                top: nextT + 'px'
            }, 1000);
        },
        go1: function () {
            let curL = parseFloat($box.css('left'));
            let nextL = curL + 40;
            if (nextL > 360){
                return true
            }
            $box.stop().animate({
                left: nextL + 'px'
            }, 1000);
        },
        go2: function () {
            let curT = parseFloat($box.css('top'))
            let nextT = curT + 40;
            if (nextT > 360){
                return true
            }
            $box.stop().animate({
                top: nextT + 'px'
            }, 1000);
        },
        go3: function (T) {
            let curL = parseFloat($box.css('left'));
            let nextL = curL - 40;
            if (nextL < 0){
                return true
            }
            $box.stop().animate({
                left: nextL + 'px'
            }, 1000);
        }
    };





    //随机生成小方块和头部方向
    (function () {
        let randomT = Math.floor(Math.random() * 10),
            randomL = Math.floor(Math.random() * 10);
        $box.css('top', randomT * 40 + 'px');
        $box.css('left', randomL * 40 + 'px');
        $head.css('transform', 'rotate(' + randomRotate * 90 + 'deg)');
    })()



    let order = {
        "GO": function () {
            let direction = randomRotate;
            GO['go' + randomRotate]();
        },
        "TUN LEF": function () {
            let cur = randomRotate;
            randomRotate -= 1;
            if (randomRotate === -1) {
                randomRotate = 3
            }
            $head.rotate(cur, randomRotate)
        },
        "TUN RIG": function () {
            let cur = randomRotate;
            randomRotate += 1;
            if (randomRotate === 4) {
                randomRotate = 0
            }
            $head.rotate(cur, randomRotate)
        },
        "TUN BAC": function () {
            let cur = randomRotate;
            randomRotate += 2;
            if (randomRotate === 4) {
                randomRotate = 0
            } else if (randomRotate === 5) {
                randomRotate = 1
            }
            $head.rotate(cur, randomRotate)
        },
        "TRA LEF": function () {
            
            GO['go3']()
        },
        "TRA TOP": function () {
            
            GO['go0']()
        },
        "TRA RIG": function () {
            
            GO['go1']()
        },
        "TRA BOT": function () {
            
            GO['go2']()
        }
    };
    order['MOV LEF'] = function () {
        if(GO['go3']()) return;
        let cur = randomRotate;
        randomRotate = 3;
        $head.rotate(cur,randomRotate)
    };
    order['MOV RIG'] = () => {
        if(GO['go1']()) return;
        let cur = randomRotate;
        randomRotate = 1;
        $head.rotate(cur,randomRotate)
        
    };
    order['MOV TOP'] = () => {
        if(GO['go0']()) return;
        let cur = randomRotate;
        randomRotate = 0;
        $head.rotate(cur,randomRotate)
        
    };
    order['MOV BOT'] = () => {
        if(GO['go2']()) return;
        let cur = randomRotate;
        randomRotate = 2;
        $head.rotate(cur,randomRotate);
    }
    $order.on('click', () => {
        debugger;
        let value = $value.val();
        order[value]();
    })
})