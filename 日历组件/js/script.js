$(function () {
    let curDate = new Date();
    //周几
    let curWeek = curDate.getDay();
    //几号
    let curDay = curDate.getDate();
    //月份
    let curMonth = curDate.getMonth() + 1;
    //年
    let curYear = curDate.getFullYear();
    //字符串格式的日期
    let curDateStr = curDate.toDateString();


    let $showYear = $("#showYear"),
        $showMonth = $("#showMonth");
    $showYear.html(curYear);
    $showMonth.html(curMonth);

    let bigM = [1, 3, 5, 7, 8, 10, 12];
    //

    //当前月份应有多少天
    let sumDay;

    if (curYear % 4 === 0) {
        if (curMonth === 2) {
            sumDay = 29;
        }
    } else {
        if (bigM.indexOf(curMonth) > -1) {
            sumDay = 31;
        } else if (curMonth === 2) {
            sumDay = 28
        } else {
            sumDay = 30
        }
    }

    //当前月份第一天周几
    let firstDay;
    if(curDate<7){
        firstDay = 
    }





    let lis = $("#wrapper>li");
    console.log(curWeek, curDate, curDay, curMonth, curYear, curDate.toDateString());
})


//首先判断当前