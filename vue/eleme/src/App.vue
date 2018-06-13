<template>
    <div class="container">
        <shop-header></shop-header>
        <div class="header-router">
            <router-link to="/order" tag="div">
                <span>点餐</span>
            </router-link>
            <router-link to="/review" tag="div">
                <span>评价</span>
            </router-link>
            <router-link to="/shop" tag="div">
                <span>商家</span>
            </router-link>
        </div>
        <router-view></router-view>
        <div class="shop-footer"></div>
    </div>
</template>

<script>
import shopHeader from "./components/header.vue"
export default {
    created(){
        this.computedREM();
        window.addEventListener('resize',this.computedREM);
    },
    methods:{
        computedREM(){
            let winW = document.documentElement.clientWidth || document.body.clientWidth,
                desW = 320;
            if(winW >= desW){
                document.documentElement.style.fontSize = '100px';
                return 
            }
            document.documentElement.style.fontSize = winW/desW * 100 +'px'
        }
    },
    components:{
        shopHeader
    }
}
</script>

<style lang="less"> 
    @import "./style/header.less";
    
</style>
