<template>
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
</template>

<script>
export default {
    name:'Header'
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
</style>
