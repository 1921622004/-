import Vue from "vue";

Vue.component('myInput',{
    template:'<div><input type="text" @hover="hoverFn" @change="changeFn" :class=""></div>',
    props:{
        errMsg:{
            type:String,
            required:true
        }
    },
    data(){
        return {

        }
    }
})