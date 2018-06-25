<template>
    <div class="container">
        <el-table
        :data="backUpList"
        style="width: 100%">
        <el-table-column
            width="70">
        <template  slot-scope="scope">
            <el-checkbox 
                @change="addToRemoveList($event,scope.$index)"
                v-model="backUpList[scope.$index].toRemove"></el-checkbox>
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
                :disabled="!(backUpList[scope.$index].status==0)">编辑</el-button>
            <el-button 
                size="mini" 
                type="danger" 
                @click="remove(scope.$index)"
                plain>删除</el-button>
            <el-button 
                size="mini"
                @click="$router.push({name:'count',params:{id:scope.$index}})"
                :disabled="backUpList[scope.$index].status==0">查看数据</el-button>
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
import {deleteQ} from '../../request'

export default {
    name:'List',
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    created(){
        this.backUpList.forEach((item,index) => {
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
            this.$set(this.backUpList[index],'toRemove',false)
        });
    },
    data(){
        return {
            backUpList:this.list,
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
                deleteQ([index]).then(res => {
                    if(res.code == 0){
                        this.$message('删除成功');
                        this.backUpList = this.backUpList.filter((item,_index) => _index!=index);
                        this.$emit('update:list',this.backUpList)
                        this.jumpToCreate()
                    }else{
                        this.$message.error('请稍后重试')
                    }
                })
            }).catch(() => {})
        },
        addToRemoveList(flag,index){
            if(flag){
                this.backUpList[index].toRemove = true;
                return
            }
            this.backUpList[index].toRemove = false;
        },
        removeSelected(){
            this.$confirm('确认要删除所选问卷？','提示',{
                center:true,
                closeOnClickModal:false
            }).then(() => {
                let ary = [];
                this.backUpList.forEach((item,index) => {
                    if(item.toRemove){
                        ary.push(index)
                    }
                })
                deleteQ(ary).then(res => {
                    if(res.code == 0){
                        this.$message('删除成功');
                        this.backUpList = this.backUpList.filter(item => !item.toRemove);
                        this.$emit('update:list',this.backUpList)
                        this.jumpToCreate();
                    }else{
                        this.$message.error('请稍后重试');
                    }
                })
            }).catch(() => {})
        },
        jumpToCreate(){
            if(this.backUpList.length <= 0){
                this.$router.push('/mine/empty');
            }
        }
    },
    computed:{
        all:{
            get(){
                return this.backUpList.every(item => item.toRemove) && this.backUpList.length>0
            },
            set(val){
                this.backUpList.forEach(item => item.toRemove = val)
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
