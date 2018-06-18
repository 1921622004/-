<template>
      <el-container>
          <el-header :height="'60px'">
            <qus-header></qus-header>
          </el-header>
          <router-view></router-view>
          
      </el-container>
</template>

<script>
import Header from './components/Header.vue'
import Mine from './components/Mine.vue'
export default {
  name: 'App',
  components:{
    qusHeader:Header
  }
}
</script>

<style lang="less" >
*{
  margin: 0;
  padding: 0;
}
html,body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background-color: #efefef;
}
ul{
  list-style: none;
}
.el-header{
  background-color: #409EFF;
  width: 100%;
  color: white;
}

</style>
