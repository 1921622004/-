<template>
    <div class="shop-header">
        <nav>
            <span> < </span>
        </nav>
        <h1>
            <img src="images/header-logo.png" alt="">
        </h1>
        <div class="shop-detail">
            <h2 class="shop-name">
                <span class="brand">品牌</span>
                <p>真功夫(北京搜秀店)</p>
            </h2>
            <h3 class="shop-header2"> 
                <span>4.9</span><span>月售</span><span>蜂鸟专送 约22分钟</span><span>距离1.4km</span>
            </h3>
            <p class="shop-msg">{{msg}}</p>
        </div>
        <div class="first-discount" @click="discountShow = !discountShow">
            <span class="sd-logo">首单</span>
            <span class="new-user">新用户下单立减7元(不与其他活动同享)</span>
            <span class="discount-num">6个优惠</span>
        </div>
        <div class="gift" @click="couponShow = !couponShow">
            <span class="gift-l">8元无门槛红包</span><span class="gift-r">领取</span>
        </div>
        <van-popup v-model="discountShow" position="bottom">
            <h3>优惠活动</h3>
            <ul>
                <li v-for="(item,index) in shop.activities" :key="index">
                    <div>
                        <span class="tag" :style="{'background-color':'#'+item.icon_color}">{{item.icon_name}}</span>
                        <span class="text" >{{item.description}}</span>
                    </div>
                </li>
            </ul>
        </van-popup>
        <van-popup v-model="couponShow" position="bottom" class="discount-popup">
            <h3>店铺专享红包</h3>
            <van-coupon-list
            :coupons="coupons"
            :show-exchange-bar="false"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'欢迎光临真功夫，用餐高峰期请提前下单，我们将会立即处理外卖订单，遇到阴雨天可能会出现稍有延误的情况，我们将配合棋手用心出餐，为您提供最优质，舒心的服务，是我们的追求',
            discountShow:false,
            couponShow:false,
            coupons:[{
                available: 1,
                discount: 8,
                denominations:800,
                value: 150,
                name: '满任意金额可用',
                start_at: 1489104000,
                origin_condition:0,
                end_at:1529065984
            }]
        }
    },
    props:['shop'],
    created(){
        console.log(this.shop);
        
    }
}
</script>

<style scoped lang="less">
@import "../style/header.less";
.van-popup{
    text-align: left;
    font-size: .14rem;
    width: 100%;
    padding-bottom: .7rem;
    h3{
        text-align: center;
        line-height: .3rem;
    }
    li{
        margin-left: .3rem;
        margin-top: .2rem;
        .tag{
            display: inline-block;
            padding: .01rem;
            color: #fff;
            border-radius: .03rem;
        }
    }   
}
.discount-popup{
    padding-bottom: .7rem;
    
}
</style>
