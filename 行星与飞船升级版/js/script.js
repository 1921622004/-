

// 第二代宇宙飞船系统进步了很多，但是我们依然无法知道飞船的能源消耗情况，可能有的时候我们发出开始飞行的指令，
// 但飞船早就没有能量了，所以我们再次进行升级，这次我们需要增加一个飞船状态的监视系统
// 我们为每个飞船增加一个信号发射器，飞船会通过BUS系统定时（比如每秒）广播自己的飞行状态。
// 发送的时候，我们通过已经安装在飞船上的Adapter把状态数据翻译成二进制码形式，把飞船自身标示
// ，飞行状态，能量编码成一个16位的二进制串，前四位用于飞船自身标示，接下来4位表示飞行状态，
// 0010为停止，0001为飞行，1100表示即将销毁，后八位用于记录飞船剩余能源百分比
// 行星上有一个信号接收器，用于通过BUS系统接受各个飞船发送过来的信号
// 当信号接收器接收到飞船信号后，会把信息传给数据处理中心（DC），数据处理中心依然是调用Adapter模块，
// 把这些二进制数据转为对象格式存储在DC中
// 实现一个行星上的监视大屏幕（如图），用来显示所有飞船的飞行状态及能源情况，
// 当数据处理中心飞船数据发生变化时，它会相应在监视器上做出变化

//初始化所需要的一切变量
let $create = $('#create'),
    $controlBar = $("#controlBar"),
    $wrapper = $("#trueWrapper"),
    log = $('.log').get(0),
    $infoBar = $("#info-bar"),
    tCode = ['0010', '0001', '1100'],
    status = ['停止', '飞行中', '即将销毁','已销毁'],
    initShipNumber = [1, 2, 3];


    //这个是用来处理code并且渲染监视屏幕的方法
let DC = (code) => {
    let reg = /^000(\d)(\d{4})00000(\d{3})$/,
        id,
        statusData,
        energy;
    code.replace(reg, function () {
        let arg = arguments;
        id = arg[1];
        statusData = status[tCode.indexOf(arg[2])];
        let reg2 = /0*([^0]+)/;
        energy = arg[3].replace(reg2, function () {
            return arguments[1]
        });
    })
    let $thisTr = $infoBar.find('.No' + id);
    let $thisStatus = $thisTr.find('.status');
    $thisStatus.html(statusData);
    let $thisEnergy = $thisTr.children(".energyInfo");
    $thisEnergy.html(energy);
}
//利用构造函数解决
class Ship {
    constructor(options) {
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        };
        this.status = 0;
        this.initRotateDeg = 0;
        this.initEnergy = 100;
        this.createElement(this.id);
        this.bindEvent(this.btnGroup);
        this.chooseFn(this.power, this.energy);
        //每隔1s向DC发送信息
        this.statusTimer = setInterval(() => {
            this.BUS()
        }, 1000)
    }
    //初始化创建元素  并且绑定与实例绑定
    createElement(id) {
        let str, str2, str3, str4;
        str = `
                <div class="mask"></div>
                <p>
                    ${id}号-
                    <span id="energy${id}">${this.initEnergy}</span>% </span>
                </p>
            `;
        this.spaceship = document.createElement('div');
        this.spaceship.className = 'spaceship';
        this.spaceship.id = 'spaceship' + id;
        this.spaceship.innerHTML = str;
        this.btnGroup = document.createElement('li');
        this.btnGroup.setAttribute('data-id', id);
        str2 = `
                    <span>对${id}号飞船下达指令</span>
                    <a href="javascript:void(0)" class="btn">launch</a>
                    <a href="javascript:void(0)" class="btn">fly</a>
                    <a href="javascript:void(0)" class="btn">stop</a>
                    <a href="javascript:void(0)" class="btn">destory</a>
                `
        this.btnGroup.innerHTML = str2;
        str3 = `
            <p>${id}号飞船已经组建完成</p>
        `;
        log.innerHTML += str3;
        $controlBar.append(this.btnGroup);
        this.mask = $(this.spaceship).children('.mask').eq(0);
        this.info = $(this.spaceship).find('#energy' + this.id);
        str4 = `
                    <td>${id}号</td>
                    <td>${this.powerString}</td>
                    <td>${this.energyString}</td>
                    <td class="status">停止</td>
                    <td class="energyInfo">${this.initEnergy}%</td>
                `
        this.infoTr = document.createElement("tr");
        this.infoTr.className = 'No' + this.id;
        this.infoTr.innerHTML = str4;
        this.statusTd = $(this.infoTr).children(".status").eq(0);
        $infoBar.append(this.infoTr);
    }
    //对生产出的控制台进行绑定点击事件
    bindEvent(ele) {
        let $list = $(ele).children('a');
        $list.each((index, item) => {
            $(item).on('click', () => {
                let str = "<p>对" + this.id + "号飞船下达" + item.innerHTML + "指令</p>";
                log.innerHTML += str;
                let randomNum = Math.random() - 0.3;
                if (randomNum < 0) return;
                //利用字符串拼接找到对应实例上的方法
                this['order'+index]();
            })
        })
    }
    chooseFn(power, energy) {
        this.powerNum = power * 2 + 5;
        this.energyNum = Number(energy) + 3;
    }
    BUS() {
        //生成要发出的code
        let str1 = '000' + this.id,
            str2 = tCode[this.status],
            str3 = this.initEnergy >= 100 ? '100' : '0' + this.initEnergy,
            str = str1 + str2 + '00000' + str3;
        DC(str);
    }
    order0() {
        $wrapper.append(this.spaceship);
        //launch后添加属性
        this.landed = true;
    }
    order1() {
        //如果没有点击launch下面代码不执行
        if(!this.landed) return;
        if(!this.flyTimer){
            this.flyTimer = setInterval(() => {
                this.initRotateDeg += this.powerNum;
                $(this.spaceship).css('transform', "rotate(" + this.initRotateDeg / 10 + "deg)")
            }, 17);    
        }
        this.status = 1;
        if(!this.minusEnergyTimer){
            this.minusEnergyTimer = setInterval(() => {
                this.initEnergy -= this.powerNum;
                if (this.initEnergy <= 0) {
                    this.initEnergy = 0;
                    this.status = 0;
                    clearInterval(this.flyTimer);
                    clearInterval(this.minusEnergyTimer);
                    this.flyTimer = null;
                }
                this.info.html(this.initEnergy);
                this.mask.css('width', this.initEnergy + 'px');
            }, 1000);
        }
        if(!this.addEnergyTimer){
            this.addEnergyTimer = setInterval(() => {
                this.initEnergy += this.energyNum;
                if (this.initEnergy > 100) {
                    this.initEnergy = 100;
                    clearInterval(this.addEnergyTimer);
                }
                this.info.html(this.initEnergy);
                this.mask.css('width', this.initEnergy + 'px');
            }, 1000)
        }
    }
    order2() {
        this.status = 0;
        clearInterval(this.flyTimer);
        clearInterval(this.minusEnergyTimer);
    }
    order3() {
        this.status = 2;
        clearInterval(this.flyTimer);
        this.flyTimer = null;
        clearInterval(this.addEnergyTimer);
        this.addEnergyTimer = null;
        clearInterval(this.minusEnergyTimer);
        this.minusEnergyTimer = null;
        this.landed = false;
        setTimeout(() => {
            $(this.spaceship).remove();
            this.status = 3;
            //将id重新放回数组，确保可以再一次取到
            initShipNumber.push(this.id);
        }, 1000)
    }
}


$create.on('click', function () {
    //这里就是要确保生成的飞船不重复
    if(initShipNumber.length === 0){
        alert('建不出来了！！！！');
        return;
    }
    let id = initShipNumber.shift();
    let powerList = document.getElementsByName('power'),
        power,
        energy,
        powerString,
        energyString;
        //下面这里就是获取radio选中值的方法
    for (let i = 0; i < powerList.length; i++) {
        const cur = powerList[i];
        if (cur.checked) {
            power = i;
            powerString = cur.value;
        }
    };
    let energyList = document.getElementsByName("energy");
    for (let i = 0; i < energyList.length; i++) {
        const element = energyList[i];
        if (element.checked) {
            energy = i;
            energyString = element.value;
        }
    }
    let ship = new Ship({
        id: id,
        power: power,
        energy: energy,
        powerString: powerString,
        energyString: energyString
    });
})
