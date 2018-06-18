<template>
    <el-main>
        <div class="container">
            <el-card class="card">
                <router-view></router-view>
            </el-card>
        </div>
    </el-main>
</template>

<script>
export default {
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
    name:'Mine'
}
</script>

<style scoped lang="less">
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
</style>
