$(function () {
    let $container = $("#container"),
        $list = $container.find('li'),
        initIndex = 1;
    

    let fn =(a)=>{
        return a>4?a-4:(a<0)?a-0:a
    }
    let change = function () {
        $list.eq(fn(initIndex - 2)).css('zIndex', -3).stop().animate({
            'marginLeft':'430px',
            'marginTop':'43.2px',
            'width':`${0.6*384}px`,
            'height':`${0.6*216}px`
        },1000,function(){
            $(this).css('zIndex',-2)
        });
        $list.eq(fn(initIndex - 1)).css('zIndex', -2).animate({
            'marginLeft':'-430px',
            'marginTop':'43.2px',
            'width':`${0.6*384}px`,
            'height':`${0.6*216}px`
        },1000,function(){

        });
        $list.eq(fn(initIndex)).css('zIndex', -1).stop().animate({
            'marginLeft':'-215px',
            'marginTop':'21.6px',
            'width':`${0.8*384}px`,
            'height':`${0.8*216}px`
            
        },1000);
        $list.eq(fn(initIndex + 1)).css('zIndex', 0).stop().animate({
            'marginLeft':'0px',
            'marginTop':'0px',
            'width':`384px`,
            'height':'216px'
        },1000);
        $list.eq(fn(initIndex + 2)).css('zIndex', -1).stop().animate({
            'marginLeft':'215px',
            'marginTop':'21.6px',
            'width':`${0.8*384}px`,
            'height':`${0.8*216}px`
        },1000);
    }
    let autoMove = function(){
        setInterval(()=>{
            debugger;
            initIndex++;
            if(initIndex>4){
                initIndex = 0;
            };
            change()
        },3000)
    }
    autoMove();
})