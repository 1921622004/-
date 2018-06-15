<template>
    <div class="container">
        <shop-header :shop="initData"></shop-header>
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
        <keep-alive>
            <router-view :shop="initData"></router-view>
        </keep-alive>
        
        <div class="shop-footer"></div>
    </div>
</template>

<script>
import shopHeader from "./components/header.vue"
import axios from 'axios';
axios.interceptors.response.use(res => res.data)
export default {
    data(){
        return {
            initData:{}
        }
    },
    created(){
        this.computedREM();
        window.addEventListener('resize',this.computedREM);
        this.getData()
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
        },
        async getData(){
            this.initData = (await axios.get('https://www.easy-mock.com/mock/5b20c80bbf99c32d68c0b766/'))[0]
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
