<template>
    <div class="car-wrapper">
        <div class="car-img">
            <img src="../images/car.svg" alt="">
            <span>2</span>
        </div>
        <div>
            <p class="sum-price">￥{{sum}}</p>
            <p class="py-price">配运费</p>
        </div>
        <span>{{msg}}</span>    
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'5元起送'
        }
    },
    created(){
        console.log(this.sum);
        
    },
    props:['sum']
}
</script>

<style scoped lang="less">
    .car-wrapper{
        position: fixed;
        left: 0;
        bottom: 0;
        height: .5rem;
        z-index: 0;
        background-color: #333;
        width: 100%;
        box-sizing: border-box;
        color: white;
        padding-left: 1rem;
        .sum-price{
            font-size: .16rem;
            line-height: .24rem;
        }
        .py-price{
            font-size: .12rem;
            color: #eee;
        }
        span{
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: .8rem;
            text-align: center;
            line-height: .5rem;
            margin-right: .2rem;
        }
        .car-img{
            position: absolute;
            width: 0.6rem;
            height: 0.6rem;
            left: .2rem ;
            bottom: .1rem;
            background-color: #38f;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            img{
                display: block;
                width: 0.3rem;
                height: 0.3rem;
            }
            span{
                display: block;
                position: absolute;
                width: 0.2rem;
                height: 0.2rem;
                line-height: .2rem;
                font-size: .12rem;
                background-color: red;
                border-radius: 50%;
                color: #fff;
                margin: 0;
                top: 0;
                right: 0;
            }
        }
    }
</style>
