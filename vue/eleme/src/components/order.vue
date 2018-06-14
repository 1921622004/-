<template>
    <div>
        <div class="list">
            <ul class="category-list">
                <li v-for="(item,index) in list" :key="index" @click="scrollTo(item,index)">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <ul class="item-list" ref="scrollul">
                <li v-for="(category,index) in list" :key="index" :ref="index">
                    <div class="c-title">
                        <span class="c-name">{{category.name}}</span>
                        <span class="c-description">{{category.description}}</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in category.foods" :key="index" >
                     
                                <div class="img-wrap">
                                    <img src="../images/111.jpeg" alt="">
                                </div>
                                <div class="text-wrapper">
                                    <p class="item-name">{{item.name}}</p>
                                    <p class="item-des">{{item.description}}</p>
                                    <div class="item-review">
                                        <span class="item-month">月售{{item.month_sales}}</span>
                                        <span class="item-satisfy">好评率{{item.satisfy_rate}}%</span>
                                    </div>
                                    <div class="item-activity" v-if="item.activity"></div>
                                    <div class="item-price">
                                        <span>￥{{item.specfoods[0].price}}</span>
                                    </div>
                                </div>                                
                        
                            <strong class="plus"> + </strong>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <order-car :sum="sumPrice"></order-car>
    </div>
</template>

<script>
import orderCar from './order-car.vue'
export default {
    data(){
        return {
            list:[],
            sumPrice:0
        }
    },
    async created(){
        this.list = await new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('get','https://www.easy-mock.com/mock/5b20c4ee16889c6fc1c5034d/example/data');
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText))
                }
            };
            xhr.send(null)
        })
    },  
    methods:{
        scrollTo(item,index){
            let top = 0;
            for(let i = 0; i<index; i++){
                top += this.$refs[i][0].offsetHeight
            };
            let curScroll = this.$refs.scrollul.scrollTop;
            let diff = top - curScroll;
            let step = diff/300*17;
            let usedTime = 0;
            let timer = setInterval(() => {
                usedTime += 17;
                if(usedTime >= 300){
                    this.$refs.scrollul.scrollTop = top;
                    clearInterval(timer);
                    return
                }
                this.$refs.scrollul.scrollTop += step;
            },17)
            
        }
    },
    components:{ orderCar }
}
</script>

<style scoped lang="less">
    .list{
        display: flex;
        flex-direction: row;
        height: 5.7rem;
        .category-list{
            width: .9rem;
            overflow-y: scroll;
            background-color: #eee;
            li{
                width: .8rem;
                padding: .17rem .07rem;
                border-bottom: .01rem solid #dedede;
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;   
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            
        }
        .item-list{
            overflow-y: scroll;
            flex: 1;
            margin-left: .2rem;
            li{
                .c-title{
                    border-bottom: 1px solid #eee;
                    padding: .1rem 0;
                    .c-name{
                        font-size: .13rem;
                    }
                    .c-description{
                        font-size: .1rem;
                        color: gray;
                    }
                }
                ul{
                    li{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        position: relative;
                        margin: .2rem 0;
                        .img-wrap{
                            width: .8rem;
                            flex: none;
                            img{
                                width: 100%;
                            }
                        }
                        .text-wrapper{
                            padding-left: .08rem;
                            .item-name{
                                font-size: .14rem;
                                font-weight: bolder;
                            }
                            .item-des{
                                overflow: hidden;
                                max-width: 1.6rem;;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .item-review,.item-des{
                                font-size: .12rem;
                                margin: .06rem 0;
                                color: gray;
                            }
                            .item-price{
                                color: #f60;
                                font-weight: bolder;
                            }
                        }
                        strong{
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            color: white;
                            background-color: gray;
                            border-radius: 50%;
                            width: 0.2rem;
                            height: 0.2rem;
                            text-align: center;
                            line-height: .2rem;
                        }
                    }
                }
            }
        }
    }
</style>
