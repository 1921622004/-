<template>
    <div class="container">
        <el-button type="primary" icon="el-icon-plus" @click="create">新建问卷</el-button>
    </div>
    
</template>

<script>
export default {
    name:'Empty',
    methods:{
        create(){
            this.$router.push('create')
        }
    }
}
</script>

<style scoped lang="less">
    .container{
        height: 320px;
        position: relative;
        .el-button{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
</style>
