// 动力系统:可以完成飞行和停止飞行两个行为，暂定所有飞船的动力系统飞行速度是一致的，比如每秒20px，
//         飞行过程中会按照一定速率消耗能源（比如每秒减5%）
// 能源系统:提供能源，并且在宇宙中通过太阳能充电（比如每秒增加2%，具体速率自定）
// 信号接收处理系统，用于接收行星上的信号
// 自爆系统:用于自我销毁

// 每个飞船的能源是有限的，用一个属性来表示能源剩余量，这是一个百分比，表示还剩余多少能源。
// 能源耗尽时，飞船会自动停止飞行
// 飞船有两个状态：飞行中和停止，飞船的行为会改变这个属性状态
// 飞船的自我销毁方法会立即销毁飞船自身
// 行星上有一个指挥官（不需要在页面上表现出其形象），指挥官可以通过行星上的信号发射器发布如下命令

// 创建一个新的飞船进入轨道，最多可以创建4个飞船，刚被创建的飞船会停留在某一个轨道上静止不动
// 命令某个飞船开始飞行，飞行后飞船会围绕行星做环绕运动，需要模拟出这个动画效果
// 命令某个飞船停止飞行
// 命令某个飞船销毁，销毁后飞船消失、飞船标示可以用于下次新创建的飞船

// 你需要设计类似如下指令格式的数据格式

//         {
//             id: 1,
//             commond: 'stop'
//         }

// 指挥官通过信号发射器发出的命令是通过一种叫做Mediator的介质进行广播
// Mediator是单向传播的，只能从行星发射到宇宙中，在发射过程中，有30%的信息传送失败（丢包）概率，你需要模拟这个丢包率，另外每次信息正常传送的时间需要1秒
// 指挥官并不知道自己的指令是不是真的传给了飞船，飞船的状态他是不知道的，他只能通过自己之前的操作来假设飞船当前的状态
// 每个飞船通过信号接收器，接受到通过Mediator传达过来的指挥官的广播信号，但因为是广播信号，
// 所以每个飞船能接受到指挥官发出给所有飞船的所有指令，因此需要通过读取信息判断这个指令是不是发给自己的



(function () {
    // 获取所需元素
    let $wrapper = $("#wrapper"),
        $aList = $("#commender").find('a'),
        mediator,
        $log = $('.log'),
        allTimer = {
            timer1:null,
            timer2:null,
            timer3:null,
        }
        allDeg = {
            deg1:0,
            deg2:0,
            deg3:0
        }
        infoList = {
            info1:$("#info1"),
            info2:$("#info2"),
            info3:$("#info3"),
        }


    //所有飞船接受指令
    let call = (mediator) => {
        //模拟丢包
        // debugger;
        let randomNum = Math.random() - 0.3;
        if (randomNum < 0) return;
        //飞船对信号进行判断
        let {id,commond: curCommond} = mediator,
            str = "spaceship" + id,
            $thisSHip = $('#' + str);
        switch (curCommond) {
            case "launch":
                launchFn($thisSHip, id)
                break;
            case "fly":
                flyFn($thisSHip, id)
                break;
            case "stop":
                stopFn($thisSHip, id)
                break;
            default:
                destoryFn($thisSHip, id);
                break;
        }
    }

    let launchFn = (ship, id) => {
        //判断当前飞船是否已经存在
        if (ship.length === 0) {
            let htmlStr = $wrapper.html();
            htmlStr += `<div class="spaceship" id="spaceship${id}"></div>`;
            $wrapper.html(htmlStr);
        }
    }
    //飞行指令执行的函数
    let flyFn = (ship, id) => {
        debugger;
        if (ship.length === 0) return;
        let info = infoList["info"+id],
            usedTime = 0;
        //获取对应能量
        
        clearInterval(allTimer["timer"+id]);
        allTimer["timer"+id] = null;
        let energy = info.html();
        //利用自定义属性值，执行动画
        //先清除上一个定时器，避免动画重复
        clearInterval(ship.attr("timer"))
        ship.attr('timer', setInterval(function () {
            allDeg["deg"+id]++;
            usedTime++;
            console.log(info);
            if (usedTime % 12 === 0) {
                energy--;
                info.html(energy)
            }
            if (energy === 0) {
                clearInterval(ship.attr("timer"))
            }
            ship.css('transform', "rotate(" + allDeg["deg"+id] + "deg)")
        }, 17))
    }
    //删除自定义属性值，停止飞行动画
    let stopFn = (ship, id) => {
        if (ship.length === 0) return;
        clearInterval(ship.attr('timer'));
        ship.removeAttr('timer');
        supportFn(id);
    }
    //self-destruction
    let destoryFn = (ship, id) => {
        if (ship.length === 0) return;
        clearInterval(allTimer["timer"+id]);
        clearInterval(ship.attr('timer'));
        ship.remove();
        let info = infoList["info"+id];
        info.html('100');
    }
    //补充能量
    let supportFn = (id) => {
        let info = infoList["info"+id],
            energy = info.html();
        allTimer["timer"+id] = setInterval(function () {
            energy++;
            if (energy === 100) {
                clearInterval(allTimer["timer"+id])
            }
            info.html(energy)
        }, 1000)
    }


    return init = function () {
        //按钮绑定，生成指令
        $aList.each(function (index, item) {
            $(item).on('click', function () {
                if (index < 4) {
                    id = 1
                } else if (index < 8) {
                    id = 2
                } else {
                    id = 3
                }
                mediator = {
                    id: id,
                    commond: $(item).html()
                };
                let a = document.createElement('p');
                $(a).html("对" + mediator.id + "号飞船下达" + mediator.commond + "指令");
                $log.append(a);
                call(mediator);
            })
        })
    }
})()
init();