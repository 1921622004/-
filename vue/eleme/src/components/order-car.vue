<template>
<div>
    <div class="car-wrapper" v-on:click="isClick = !isClick">
        <div class="car-img" >
            <img src="../images/car.svg" alt="">
            <span v-show="order.length" class="order-num">{{orderNum}}</span>
        </div>
        <div>
            <p class="sum-price">￥{{sum}}</p>
            <p class="py-price">配运费</p>
        </div>
        <span :class="{balance:sum>5}" class="js">{{sum>5?'去结算':'5元起送'}}</span>    
        
    </div>
    <van-popup v-model="show" position="bottom" @click-overlay="isClick=false">
        <div class="head">
            <span class="h-l">已选商品</span>
            <span class="h-r" @click="removeAll"><van-icon name="delete"></van-icon>清除</span>
        </div>
        <ul>
            <li v-for="(item,index) in order" :key="index" v-if="item.orderNum>0">
                <div>
                    <span class="h-l">{{item.name}}</span>
                    <div class="h-r">
                        <span class="price">￥{{item.price * item.orderNum}}</span>
                        <van-stepper v-model="item.orderNum" @minus="check(index)" :min="0"/>
                    </div>
                </div>
            </li>
        </ul>
    </van-popup>
</div>
    
</template>

<script>
export default {
    data(){
        return {
            isClick:false,
            backUp:[]
        }
    },
    computed:{
        sum(){
            let sumPrice = 0;
            this.order.forEach(element => {
                sumPrice += element.orderNum * element.price
            });
            return sumPrice
        },
        orderNum(){
            let num = 0;
            this.order.forEach(item => {
                num += item.orderNum
            })
            return num
        },
        show:{
            get(){
                return this.order.length > 0 && this.isClick
            },
            set(){

            }
        }
    },
    methods:{
        removeAll(){
            this.$emit('update:order',[])
        },
        check(index){
            if(this.order[index].orderNum == 0){
                this.backUp = this.order.filter((item,_index) => _index!=index)
            }
            this.$emit('update:order',this.backUp)
        }
    },
    props:['order']
}
</script>

<style scoped lang="less">
    .car-wrapper{
        position: fixed;
        z-index: 2200;
        left: 0;
        bottom: 0;
        height: .5rem;
        background-color: rgba(0,0,0,.7);
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
        .js{
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: .8rem;
            text-align: center;
            line-height: .5rem;
        }
        .balance{
            color:#fff;
            background-color: #4cd964;
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
            .order-num{
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
                text-align: center;
            }
        }
    }
    .van-popup{
        padding: 0 .2rem .5rem;
        .head{
            background-color: #e3e3e3;
            height: 0.3rem;
            line-height: .3rem;
            font-size:.16rem;
            padding: 0 .15rem;
        }
        .h-r{
            float: right;
        }
        .van-stepper{
            display: inline-block;
        }
        li{
            padding: .15rem;
            height: 0.3rem;    
            border-bottom: 1px solid #eee;
        }
        .price{
            color: #ff6600;
        }
    }
</style>
