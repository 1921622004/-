<template>
    <div class="container">
        <h1 @dblclick="titleEditor = !titleEditor">
            <p v-show="!titleEditor">{{title}}</p>
            <el-input
                v-show="titleEditor"
                v-model="title"
                @blur="titleEditor=false"
                @keydown.enter="titleEditor=false">
            </el-input>
        </h1>
        <ul >
            <li v-for="(item,index) in list" :key="index" class="question-item" >
                <div v-if="item.type=='radio'">
                    <p>Q{{index+1}}单选题：{{item.question}}</p>
                    <el-radio-group v-model="item.tab">
                        <el-radio v-for="(tab,_index) in item.tab" :label="tab" :key="_index" disabled></el-radio>
                    </el-radio-group>
                </div>
                <div v-else-if="item.type=='checkbox'">
                    <p>Q{{index+1}}多选题：{{item.question}}</p>
                    <el-checkbox-group v-model="item.tab">
                        <el-checkbox v-for="(tab,_index) in item.tab" :label="tab" :key="_index" disabled></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div v-else>
                    <p>Q{{index+1}}文本题：{{item.question}}</p>
                    <el-input
                        type="textarea"
                        disabled>
                    </el-input>
                    <el-checkbox v-model="item.isRequired" class="required-checkbox">此题是否为必填</el-checkbox>
                </div>
                <ul>
                    <li v-if="index !==0" @click="moveUp(index)">上移</li>
                    <li v-if="index != list.length - 1" @click="moveDown(index)">下移</li>
                    <li @click="remove(index)">删除</li>
                </ul>
            </li>
        </ul>
        <div class="newQ">
            <div >
                <el-input
                    class="question-input"
                    placeholder="在这里输入您的问题"
                    v-model="newObj.question">
                </el-input>
                <el-radio-group v-model="newObj.type">
                    <el-radio-button label="radio">
                        <i class="el-icon-plus"></i> 单选
                    </el-radio-button>
                    <el-radio-button label="checkbox">
                        <i class="el-icon-circle-check-outline"></i> 多选
                    </el-radio-button>
                    <el-radio-button label="input">
                        <i class="el-icon-tickets"></i> 文本题
                    </el-radio-button>
                </el-radio-group>
                <div v-show="newObj.type!='input'" style="margin-top:10px;margin-bottom:10px">
                    <el-input 
                        v-model="newTab" 
                        placeholder="按下回车添加问题的选项" 
                        @change="add" 
                        class="tab-input"
                        clearable/>
                    <el-radio-group 
                        v-model="newObj.tab" 
                        v-if="newObj.tab.length">
                        <el-checkbox 
                            v-for="city in newObj.tab" 
                            :label="city" 
                            :key="city" 
                            :checked="true">
                            {{city}}
                        </el-checkbox>
                    </el-radio-group>
                </div>
                <el-row>
                    <el-button type="primary" plain @click="addNewQ">确定</el-button>
                    <el-button type="info" plain >取消</el-button>
                </el-row>
            </div>
            <div class="newWrapper" >
                <i class="el-icon-plus"></i>新增问题
            </div>
            <el-row :gutter="20">
                <el-col :span="10" >
                    <span>问卷截至日期</span>
                    <el-date-picker
                    v-model="deadline"
                    placeholder="选择日期"
                    type="date"
                    value-format="timestamp"
                    />
                </el-col>
                <el-col :offset="6" :span="4">
                    <el-button  plain @click="save">保存问卷</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain @click="publish">发布问卷</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {addNewQ} from '../../request'
import {formatDate} from '../../utils'
export default {    
    name:'Create', 
    data(){
        return {
            titleEditor:false,
            title:'这里是标题',
            deadline:'',
            list:[],
            newObj:{
                type:'',
                question:'',
                tab:[],
                isRequired:false
            },
            newTab:''
        }
    },
    methods:{
        add(val){
            if(val === '')return
            if(this.newObj.tab.indexOf(val) < 0) {
                this.newObj.tab.push(val);
                this.newTab = ''
            }
        },
        addNewQ(){
            let {newObj} = this;
            if(newObj.type  === ''){
                this.$message.error('请选择问题类型');
                return 
            }
            if(newObj.question === ''){
                this.$message.error('请编辑问题题目');
                return
            }
            if(this.newObj.type !== 'input' && this.newObj.tab.length < 2){
                console.log(newObj.type);
                
                // 类型不为文本框，选项为空所作的处理
                this.$message.error('请至少添加两个问题答案选项');
                return 
            }
            this.list.push(this.newObj);
            this.newObj = {
                type:'',
                question:'',
                tab:[]
            }
        },
        remove(index){
            this.list = this.list.filter((item,_index) => _index != index);
        },
        moveUp(index){
            let temp = this.list[index];
            let tempB = this.list[index - 1];

            this.$set(this.list,index,tempB);
            this.$set(this.list,index-1,temp)
        },
        moveDown(index){
            let temp = this.list[index];
            let tempA = this.list[index + 1];
            this.$set(this.list,index,tempA);
            this.$set(this.list,index + 1,temp);
        },
        publish(){
            let flag = this.checkDate();
            if(flag){
                this.$confirm(`是否发布问卷？\n (此问卷有效期至${formatDate(this.deadline)})`,'提示')
                .then(() => {
                    //发布成功要做的事
                    let obj = this.formatObj();
                    if(!this.checkQuestionList(obj)) return
                    obj.status = 1;
                    addNewQ(obj).then(res => {
                        if(res.code === 0){
                            this.$emit('re-query');
                            this.$router.push({name:'list'})
                        }else{
                            this.$message.error('请稍后重试')
                        }
                    })
                }).catch(() => {
                    //发布失败
                })
            }
        },
        checkDate(){
            let date = Date.now();
            if(this.deadline < date){
                this.$message.error('结束时间不能早于当前时间')
                return false
            }
            return true
        },
        checkQuestionList(obj){
            if(obj.title === '这里是标题'){
                this.$message.error('请编辑您的问卷标题')
                return false
            }
            if(!obj.deadline){
                this.$message.error('请编辑您的问卷截至时间')
                return false
            }
            if(obj.questionList.length <3 || obj.questionList.length>10){
                this.$message.error('问卷问题数量为3~10')
                return false
            };
            return true
        },
        save(){
            if(!this.checkDate()) return;
            let obj = this.formatObj();
            if(!this.checkQuestionList(obj)) return;
            obj.status = 0;
            addNewQ(obj).then(res => {
                if(res.code === 0){
                    this.$emit('re-query')
                    this.$router.push({name:'list'});
                }else{
                    this.$message.error('请稍后重试')
                }
            })
        },
        formatObj(){
            return {
                title:this.title,
                deadline:this.deadline,
                questionList:this.list
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        h1{
            text-align: center;
            line-height: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #efefef;
        }
        .newQ{
            padding: 14px;
            border-bottom: 2px solid #efefef;
            .newWrapper{
                text-align: center;
                cursor: pointer;
                margin-top: 20px;
                background-color: #efefef;
                height: 80px;
                font-size: 20px;
                line-height: 80px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            .question-input{
                width: 60%;
                margin: 10px auto;
            }
            .tab-input{
                width: 30%;
            }
        }
        .question-item{
            padding: 20px 20px 40px;
            position: relative;
            transition: all .3s linear;
            &:hover{
                background-color: #efefef;
            }
            p{
                line-height: 30px;  
                margin-bottom: 10px;
            }
            ul{
                position: absolute;
                right: 20px;
                bottom: 20px;
                li{
                    font-size: 12px;
                    float: left;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
        .required-checkbox{
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }
</style>
