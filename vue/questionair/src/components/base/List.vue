<template>
    <div class="container">
        <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
            width="70">
        <template  slot-scope="scope">
            <el-checkbox 
                @change="addToRemoveList($event,scope.$index)"
                v-model="list[scope.$index].toRemove"></el-checkbox>
        </template >
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width='300'>
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间"
            width='200'>
        </el-table-column>
        <el-table-column
            prop="statusText"
            width="100"
            label="状态">
        </el-table-column>
        <el-table-column
            label="操作"
            width='250'>
        <template  slot-scope="scope">
            <el-button 
                size="mini"
                :disabled="!(list[scope.$index].status==0)">编辑</el-button>
            <el-button 
                size="mini" 
                type="danger" 
                @click="remove(scope.$index)"
                plain>删除</el-button>
            <el-button 
                size="mini"
                @click="$router.push({name:'count',params:{id:scope.$index}})"
                :disabled="list[scope.$index].status==0">查看数据</el-button>
        </template >
        </el-table-column>
        </el-table>
        
        <div class="all-wrapper">
            <el-checkbox
                v-model="all">
            全选
            </el-checkbox>
            <el-button
            type="danger"
            size="mini"
            @click="removeSelected"
            plain>
            删除
            </el-button>
        </div>
        
        <div class="new-btn-wrapper">
            <el-button 
                size="mini" 
                type="primary"
                @click="$router.push('create')"
                plain>
                新建问卷
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'List',
    created(){
        this.list.forEach((item,index) => {
            switch(item.status){
                case 0:
                    item.statusText = '未发布';
                    break;
                case 1:
                    item.statusText = '发布中';
                    break;
                case 2:
                    item.statusText = '已结束';
                    break;
            }
            this.$set(this.list[index],'toRemove',false)
        })
    },
    data(){
        return {
            list:[
                {
                    title:'1',
                    time:'2018-06-17',
                    status:1
                },
                {
                    title:'2',
                    time:'2018-06-17',
                    status:2
                },
                {
                    title:'3',
                    time:'2018-06-17',
                    status:0
                },
                {
                    title:'3',
                    time:'2018-06-17',
                    status:2
                }
            ],
            removeList:[]
        }
    },
    methods:{
        remove(index){
            this.$confirm('确认要删除此问卷？','提示',{
                center:true,
                closeOnClickModal:false
            }).then(() => {
                //这里需要发送数据
                this.list = this.list.filter((item,_index) => _index!=index)
            }).catch(() => {})
        },
        addToRemoveList(flag,index){
            if(flag){
                this.list[index].toRemove = true;
                return
            }
            this.list[index].toRemove = false;
        },
        removeSelected(){
            this.$confirm('确认要删除所选问卷？','提示',{
                center:true,
                closeOnClickModal:false
            }).then(() => {
                this.list = this.list.filter(item => !item.toRemove)
            }).catch(() => {})
        }
    },
    computed:{
        all:{
            get(){
                return this.list.every(item => item.toRemove)
            },
            set(val){
                this.list.forEach(item => item.toRemove = val)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        position: relative;
        .new-btn-wrapper{
            position: absolute;
            top: 10px;
            right: 100px;
        }
    }
    .all-wrapper{
        padding: 10px;
    }
</style>
