<template>
    <div class="info">
        <div class="info-header">
            <h3>配送信息</h3>
            <p><span>蜂鸟专送</span>约{{shop.order_lead_time}}分钟送达，距离约{{(shop.distance/1000).toFixed(1)}}km</p>
            <p>配送费{{5}}</p>
        </div>
        <div class="activity">
            <h3>活动与服务</h3>
            <ul>
                <li v-for="(item,index) in shop.activities" :key="index">
                    <div>
                        <span class="tag" :style="{'background-color':'#'+item.icon_color}">{{item.icon_name}}</span>
                        <span class="text" >{{item.description}}</span>
                    </div>
                </li>
            </ul>
            <ul>
                <li v-for="(item,index) in shop.supports" :key="index">
                    <div>
                        <span class="tag"></span>
                        <span class="text">{{item.description}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="info">
            <h3>商家信息</h3>
            <p>{{shop.shop_sign['brand_story']}}</p>
            <van-cell-group>
                <van-cell title="品类" :value="val" />
                <van-cell title="商家电话" :value="shop.phone" />
                <van-cell title="地址" :value="shop.address" />
                <van-cell title="营业时间" :value="shop.opening_hours[0]" />
            </van-cell-group>
        </div>
        <div class="right">
            <h3>营业资质</h3>
        </div>
    </div>
</template>

<script>

export default {
    props:['shop'],
    data(){
        return {
            val:''
        }
    },
    created(){
        let str = '';
        console.log(this.shop.flavors);
        
        this.shop.flavors.forEach(item => {
            str += ','+item.name
        })
        this.val = str.substring(1);
    }
}
</script>

<style lang="less" scoped>
    .info{
        font-size: .12rem;
        background-color: #f5f5f5;
        h3{
            font-size: .14rem;
            line-height: .4rem;
        }
        .info-header{
            padding: .1rem;
            background-color: #fff;
            
            span{
                display: inline-block;
                background-color:#0097ff;
                color: #fff;
                border-radius: .03rem;
                padding: .03rem;
                margin-right: .1rem;
            }
            p{
                margin: .08rem 0;
            }
        }
        .activity{
            padding: .1rem;
            margin-top: .1rem;
            background-color: #fff;
            li{
                margin: .1rem 0;
                .tag{
                    color: #fff;
                    display: inline-block;
                    padding: .02rem;
                    border-radius: .02rem;
                }
            }
        }
        .info{
            padding: .1rem;
            margin-top: .1rem;
            background-color: #fff;
            p{
                margin-bottom: .2rem;
            }
        }
        .right{
            background-color: #fff;
            padding: .1rem;
            margin-top: .1rem;
        }
        
    }
    .van-cell{
        padding-left: 0;
        padding-right: 0;
        border-top: 1px solid #eee;
    }
</style>
