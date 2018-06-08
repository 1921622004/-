

export let input = Vue.component('myInput',{
    template:`<div>
        <input type="text" 
            @focus="hoverFn" 
            @change="changeFn" 
            @blur="blurFn"
            :disabled="disabled"
            :placeholder="placeHolder"
            :style="obj"
            style="outline:none;border-width:1px;border-style:solid"
            v-model="val">
        <span v-show="flag">{{errMsg}}</span>
        </div>`,
    props:{
        errMsg:{
            type:String,
            required:false,
            default:''
        },
        disabled:{
            type:Boolean,
            required:false,
            default:false
        },
        placeHolder:{
            type:String,
            required:false,
            default:'请输入文字'
        },
        value:{
            type:String,
            default:''
        },
        placeHolder:{
            type:String,
            default:''
        },
        rule:{
            required:true,
            type:RegExp
        }
    },
    data(){
        return {
            normalClass:{
                borderColor:"#e3e3e3"
            },
            hoverClass:{
                borderColor:"#adadad"
            },
            blurClass:{
                borderColor:"#c6c6c6"
            },
            disableClass:{
                borderColor:"#e2e2e2"
            },
            errClass:{
                borderColor:"#fc8081"
            },
            obj:null,
            val:'',
            flag:false
        }
    },
    created(){
        if(!this.disabled){
            this.obj = this.normalClass
        }else{
            this.obj = this.disableClass
        };
        this.val = this.value;
    },
    methods:{
        hoverFn(){
            this.obj = this.hoverClass
        },
        changeFn(){

        },
        blurFn(){
            this.obj = this.blurClass;
            if(!this.rule.test(this.value)){
                this.flag = true;
                this.obj = this.errClass;
            }
        }
    }
});

export let checkBox = Vue.component('myCheckbox',{

})