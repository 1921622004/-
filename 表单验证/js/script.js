$(function(){
    let $wrapper = $(".wrapper"),
        $inputList = $wrapper.find('.input'),
        firstPassword,
        $btn = $("#submitBtn"),
        infoAry = ['长度为4~16个字符','长度为4~16个字符','与上次密码一致','请填入有效的邮箱地址，例如“xxx@xx.com”','11位有效电话号码']
    let test = {
        testFn0(ele,value,info){
            if(!value || value === ''){
                info.html('名称不能为空');
                $(ele).addClass('wrong');
            }else if(value.length<4 || value.length>16){
                info.html('长度为4~16个字符');
                $(ele).addClass('wrong');
            }else{
                info.html('名称可用');
                $(ele).addClass('pass');
            }
            return true;
        },
        testFn1(ele,value,info){
            if(value === ''){
                info.html('密码不能为空');
                $(ele).addClass('wrong');
                return;
            }else if(value.length<4 || value.length>16){
                info.html('长度为4~16个字符');
                $(ele).addClass('wrong');
            }else{
                info.html('密码可用');
                $(ele).addClass('pass');
            }
            firstPassword = value;
            return true;
        },
        testFn2(ele,value,info){
            if(value !== firstPassword){
                info.html('与第一次密码不同');
                $(ele).addClass('wrong');
            }else{
                info.html('验证成功');
                $(ele).addClass('pass');
            }
            return true;
        },
        testFn3(ele,value,info){
            if(value.indexOf('@')<0){
                info.html('请填入有效邮箱地址');
                $(ele).addClass('wrong');
            }else{
                info.html('邮箱地址验证成功');
                $(ele).addClass('pass');
            }
            return true;
        },
        testFn4(ele,value,info){
            let reg = /^1\d{10}$/;
            if(!reg.test(value)){
                info.html('请填入有效手机号码');
                $(ele).addClass('wrong');
            }else{
                info.html('手机号码验证成功');
                $(ele).addClass('pass');
            }
            return true;
        }
    }

    $inputList.each((index,item)=>{
        $(item).on('focus',function(){
            $(this).addClass('hover')
                .parent().next('.info').css('display','block').html(infoAry[index]);            
        })
            .on('blur',function(){
                $(this).removeClass('hover');
                let value = $(this).val();
                let $info = $(this).parent().next('.info');
                test['testFn'+index](this,value,$info)
            })
    })
    $btn.on('click',function(){
        for (let i = 0; i < $inputList.length; i++) {
            let that = $inputList.eq(i);
            that.parent().next('.info').css('display','block');
            if(that.trigger('blur')) break;
        }
    })
})


