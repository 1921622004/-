<template>
    <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="登录" name="login" >
                <el-form  
                    status-icon 
                    label-position="top"
                    label-width="100%">
                    <el-form-item label="手机号" >
                        <el-input 
                            type="text"
                            auto-complete="off" 
                            v-model="user.phone"
                            ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" >
                        <el-input 
                            type="password" 
                            auto-complete="off"
                            v-model="user.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center">
                        <el-button size="large" @click="loginFn">登录</el-button>
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="注册" name="register"  >
                <el-form  
                    :model="newUser"
                    :rules="rule3"
                    ref="newUser"
                    status-icon 
                    label-position="left"
                    label-width="80px">    
                    <el-form-item label="手机号" prop="phone">
                        <el-input 
                            type="text" 
                            auto-complete="off" 
                            v-model="newUser.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input 
                            type="password" 
                            auto-complete="off" 
                            v-model="newUser.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input 
                            type="password" 
                            auto-complete="off" 
                            v-model="newUser.confirmPassword">
                        </el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button 
                            type="primary" 
                            @click="submit('newUser')"
                            plain>
                        注册
                        </el-button>
                        <el-button 
                            @click="reset"
                        >重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import {register,loginR} from '../request'
import axios from 'axios';

export default {
    name:'Login',
    data(){
        let checkPhone= (rule,value,callback) => { 
            if(value === ''){
                return callback(new Error('电话号不能为空'))
            } else if(!/^1\d{10}/.test(value)){
                return callback(new Error('请输入有效电话号'))
            } else{
                callback()
            }
        }
        let checkPassword = (rule,value,callback) => {
            if(value.length<6){
                return callback(new Error('密码必须为6位以上'))
            } else {
                callback()
            }
        }
        let confirmPassword = (rule,value,callback) => {
            if(value != this.newUser.password){
                return callback(new Error('请与上次填写密码保持一直'))
            }else{
                callback()
            }
        }

        return {    
            activeName:'login',
            newUser:{
                phone:'',
                password:'',
                confirmPassword:'',
            },
            rule3:{
                phone:[
                    {validator:checkPhone,trigger:'blur'}
                ],
                password:[
                    {validator:checkPassword,trigger:'blur'}
                ],
                confirmPassword:[
                    {validator:confirmPassword,trigger:'blur'}
                ]
            },
            user:{
                phone:'',
                password:''
            }
        }
    },
    methods:{
        handleClick(){

        },
        reset(){
            for (const attr in this.newUser) {
                this.newUser[attr] = ''
            }
        },
        submit(newUser){
            let {phone,password} = this.newUser;
            let flag; 
            this.$refs[newUser].validate((valid) => {
                if(valid){
                    flag = true
                }else{
                    flag = flase
                }
            })
            if(flag){
                register(phone,password).then(res => {
                    if(res.code === 0){
                        this.activeName = 'login'
                    }else{
                        // 报错处理
                        this.$message.error('当前手机号已被注册。')
                    }
                })
            }    
        },
        loginFn(){
            let {phone,password} = this.user;
            loginR(phone,password).then(res => {
                if(res.code === 0){
                    this.$router.push('/mine')
                }else{
                    this.$message.error('请确认手机号及密码')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .el-card{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        .el-tabs{
            width: 400px;
            height: 350px;
        }
    }
</style>
