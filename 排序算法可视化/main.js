var oBox = document.getElementById('box'),
    leftIn = document.getElementById('leftin'),
    rightIn = document.getElementById('rightin'),
    leftOut = document.getElementById('leftout'),
    rightOut = document.getElementById('rightout'),
    bubbleBtn = document.getElementById('bubble'),
    mixAryBtn = document.getElementById('mix'),
    insertBtn = document.getElementById('insert');
leftIn.onclick =function () {
    li();
};
leftOut.onclick = function () {
    lo();
};
rightIn.onclick = function () {
    ri();
};
rightOut.onclick = function () {
    ro();
};
mixAryBtn.onclick = function () {
    mixFn();
};
insertBtn.onclick = function () {
    insertFn();
};
function checkData() {
    value = document.getElementById('numValue').value;
    if(Number(value)!=value || value === ''){
        alert("请输入正确格式的数字");
        return false;
    }
}
function li(){
    if(checkData() === false){
        return;
    }
    var numList = oBox.getElementsByTagName('li');
    var oLi = document.createElement('li');
    oLi.style.height = value+'px';
    oLi.setAttribute("data-num",value);
    oBox.appendChild(oLi);
    oBox.insertBefore(oLi,numList[0]);
}
function ri(){
    if(checkData() === false){
        return;
    }
    var numList = oBox.getElementsByTagName('li');
    var oLi = document.createElement('li');
    oLi.setAttribute("data-num",value);
    oLi.style.height = value+'px';
    oBox.appendChild(oLi);
}
function lo() {
    var numList = oBox.getElementsByTagName('li');
    oBox.removeChild(numList[0]);
}
function ro() {
    var numList = oBox.getElementsByTagName('li');
    oBox.removeChild(numList[numList.length-1]);
}

bubbleBtn.onclick = function () {
    bubbleSortFn();
};

function bubbleSortFn() {
    // debugger;
    var oBox = document.getElementById('box'),
        oList = oBox.getElementsByTagName('li'),
        i = 0,
        k = 0,
        len = oList.length,
        a = setInterval(changePos,500),
        tempPrev,
        tempNext;


    function changePos() {
        //debugger;
        console.log(1);

        if(i === oList.length-1){
            clearInterval(a);
        }
        if(k === len-i-1){
            i++;
            k = 0;
            for (var j = 0; j < oList.length; j++) {
                var obj = oList[j];
                obj.style.backgroundColor = '#00c8d5';
            }
            return;
        }
        console.log(tempPrev, tempNext);
        tempPrev = tempPrev||0;
        tempNext = tempNext||0;
        oList[tempPrev].style.backgroundColor = '#00c8d5';
        oList[tempNext].style.backgroundColor = '#00c8d5';
        var tempOne = oList[k],
            tempTwo = oList[k+1];
        tempPrev = k;
        tempNext = k+1;
        if(Number(tempTwo.getAttribute('data-num'))>Number(tempOne.getAttribute('data-num'))){
            swapPos(tempTwo,tempOne)
        }
        k++;

        //先有一个函数可以将这两个要交换位置的div交换
        //有一个定时器
        //i代表当前在比的第一个div     j代表是否已经完成    k代表目前在比的第二个div
        //每次比较k++  i不变   k等于最后一项时i++  i>长度时clearInterval
        //
    }
}
function swapPos(a,b) {
    // var initColor = a.style.backgroundColor;
    a.style.backgroundColor = 'red';
    b.style.backgroundColor = 'red';
    var tempA = a.getAttribute("data-num"),
        tempB = b.getAttribute('data-num');
    a.setAttribute('data-num',tempB);
    a.style.height = tempB + "px";
    b.setAttribute('data-num',tempA);
    b.style.height = tempA + 'px';
}

function mixFn() {
    var oList = oBox.getElementsByTagName('li'),
        ary = [].slice.call(oList,0),
        frg = document.createDocumentFragment(),
        anotherAry = [],
        randomIndex = Math.round(Math.random()*(ary.length-1));
    // debugger;
    while(ary.length>0){
        if(anotherAry.indexOf(ary[randomIndex]) === -1){
            anotherAry.push(ary[randomIndex]);
        }
        if(anotherAry.length === ary.length){
            break;
        }
        randomIndex = Math.round(Math.random()*(ary.length-1));
    }
    for (var i = 0; i < anotherAry.length; i++) {
        var obj = anotherAry[i];
        frg.appendChild(obj)
    }
    oBox.appendChild(frg)
}

function insertFn() {
    //每一次拿i与k比较
    //左边一组   这一组后面的那一项拿出来与这一组每一个进行比较
    //i是当前这一组后面的那一项
    //k代表左边这一组之中要比较的哪一项的索引
    var oList = oBox.getElementsByTagName('li'),
        ary = [].slice.call(oList,0),
        i = 0,
        k = 1,
        tempI = i,
        tempK = k,
        frg = document.createDocumentFragment();
    debugger;
    oBox.timer2 = setInterval(childFn,1000);

    function childFn() {
        clearInterval(oBox.timer2);
        console.log(tempI, tempK);
        if(k === ary.length){
            for (var j = 0; j < oList.length; j++) {
                var obj = oList[j];
                obj.style.backgroundColor = '#00c8d5'
            }
            clearInterval(oBox.timer2);
            return
        }
        oList[tempI].style.backgroundColor = '#00c8d5';
        oList[tempK].style.backgroundColor = '#00c8d5';
        tempI = i;
        tempK = k;
        oList[i].style.backgroundColor = 'red';
        oList[k].style.backgroundColor = 'red';
        console.log(1);


        if(i===k){
            i = 0;
            k++;
            oBox.timer2 = setInterval(childFn,1000);
            return
        }
        if(Number(ary[k].getAttribute('data-num'))>Number(ary[i].getAttribute('data-num'))){
            var temp = ary.splice(k,1)[0];
            ary.splice(i,0,temp);
            for (var j = 0; j < ary.length; j++) {
                frg.appendChild(ary[j])
            }
            oBox.appendChild(frg);
            frg = document.createDocumentFragment();
            k++;
            i = 0;
            oBox.timer2 = setInterval(childFn,1000);
            return
        }
        i++;
        oBox.timer2 = setInterval(childFn,1000);
    }
}
