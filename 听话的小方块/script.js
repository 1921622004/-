$(function () {
    let $box = $("#box"),
        $head = $("#head"),
        $order = $("#order"),
        $value = $("#value"),
        randomRotate = Math.floor(Math.random()*4);


    //随机生成小方块和头部方向
    (function(){
        let randomT = Math.floor(Math.random()*10),
            randomL = Math.floor(Math.random()*10);
        $box.css('top',randomT*40 + 'px');
        $box.css('left',randomL*40 + 'px');
        $head.css('transform','rotate('+ randomRotate*90 + 'deg)');
    })()

    let order = {
        "GO": function () {
            let direction = randomRotate,
                curT = parseFloat($box.css('top')),
                curL = parseFloat($box.css('left'));
            switch (direction) {
                case 0: {
                    let nextT = curT - 40;
                    if (nextT < 0) return;
                    $box.css('top',nextT + 'px');
                    break;
                }
                case 1: {
                    let nextL = curL + 40;
                    if(nextL > 400) return;
                    $box.css('left',nextL + 'px');
                    break;
                }
                case 2: {
                    let nextT = curT + 40;
                    if(nextT > 400) return;
                    $box.css('top',nextT + 'px');
                    break;
                }
                case 3: {
                    let nextL = curL - 40;
                    if(nextL < 0) return;
                    $box.css('left',nextL + 'px');
                    break;
                }
            }
        },
        "TUN LEF":function(){
            randomRotate -= 1;
            if(randomRotate === -1){
                randomRotate = 3
            }
            $head.css('transform','rotate('+ randomRotate*90 + 'deg)');
        },
        "TUN RIG":function(){
            randomRotate += 1;
            if(randomRotate === 4){
                randomRotate = 0
            }
            $head.css('transform','rotate('+ randomRotate*90 + 'deg)');
        },
        "TUN BAC":function(){
            randomRotate += 2;
            if(randomRotate === 4){
                randomRotate = 0
            }else if(randomRotate === 5){
                randomRotate = 1
            }
            $head.css('transform','rotate('+ randomRotate*90 + 'deg)');
        }
    }

    $order.on('click', () => {
        debugger;
        let value = $value.val();
        order[value]();
    })
})