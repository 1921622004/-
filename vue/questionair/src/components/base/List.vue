<template>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
        width="70">
    </el-table-column>
    <el-table-column
        prop="title"
        label="标题"
        width='370'>
    </el-table-column>
    <el-table-column
        prop="time"
        label="时间"
        width='200'>
    </el-table-column>
    <el-table-column
        prop="status"
        label="150">
    </el-table-column>
    <el-table-column 
        align="center"
        header-align="center"
        label="操作"
        width='250'>
    </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'List'
}
</script>

<style lang="less" scoped>

</style>
