$(function () {
    let $show = $("#show"),
        $mask = $("#mask"),
        $closeBtn = $(".close");
    $show.on('click',()=>{
        $mask.css('display','block');
    });
    $closeBtn.on('click',()=>{
        $mask.css('display','none');
    })
})