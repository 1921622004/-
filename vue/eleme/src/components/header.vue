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
        <div class="first-discount">
            <span class="sd-logo">首单</span>
            <span class="new-user">新用户下单立减7元(不与其他活动同享)</span>
            <span class="discount-num">6个优惠</span>
        </div>
        <div class="gift">
            <span class="gift-l">8元无门槛红包</span><span class="gift-r">领取</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'欢迎光临真功夫，用餐高峰期请提前下单，我们将会立即处理外卖订单，遇到阴雨天可能会出现稍有延误的情况，我们将配合棋手用心出餐，为您提供最优质，舒心的服务，是我们的追求'
        }
    }
}
</script>

<style scoped lang="less">
@import "../style/header.less";
</style>
