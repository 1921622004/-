<template>
    <el-container>
        <el-header>
            <div class="header">
                <el-row :gutter="20">
                    <el-col :span="4" :offset="2">
                        <h1 class="el-icon-question">问卷管理</h1>
                    </el-col>
                    <el-col :span="6">
                        <h2 @click="$router.push('/mine/list')">我的问卷</h2>
                    </el-col>
                </el-row>
            </div>
        </el-header>
        <el-main>
            <div class="container">
                <el-card class="card">
                    <router-view :initList.sync='tableData' @re-query='reQueryData'></router-view>
                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import {getData, loginR} from '../request'
export default {
    async created(){
        await getData().then(res => {
            if(res.code === 1){
                this.$router.push('/mine/empty');
            }else {
                this.tableData = res.list;
                this.$router.push('/mine/list')
            }
        })
    },
    data(){
        return {
            tableData:[
                {
                    title:'这是我的第一份调查问卷',
                    time:'2018-6-17',
                    status:'已发布'
                }
            ]
        }
    },
    methods:{
        async reQueryData(){
            await getData.then(res => {
                console.log(res);
                if(res.code == 0){
                    this.tableData = res.list;
                }
            })
        }
    },
    name:'Mine'
}
</script>

<style scoped lang="less">
.header{
        width: 100%;
        height: 100%;
        line-height: 60px;
        .el-col{
            height: 100%;
        }
        h2{
            cursor: pointer;
            font-size: 18px;
            font-weight: normal;
        }
    }
    .container{
        width: 100%;
        .card{
            width: 1040px;
            margin: 80px auto;
            background-color: #fff;
            position: relative;
            padding: 0;
        }
    }
    .el-header{
        background-color: #409EFF;
        width: 100%;
        color: white;
    }
</style>
