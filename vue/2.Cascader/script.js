let cascader = Vue.component('cascader', {
    props: {
        initData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            flag: false,
            deepData: {},
            value: '请选择',
            deepValue: {},
            classAry: ['inputBar'],
            ulShow: false,
            deepShow: {
                show0: true
            }
        }
    },
    created() {

        //获取数组维度
        this.deep = this.getDeep()

        let str2 = ``;
        for (let i = 0; i < this.deep; i++) {
            this.$set(this.deepShow, `show${i+1}`, false);
            this.$set(this.deepData, `data${i}`, []);
            this.$set(this.deepValue, `value${i}`, '');
            str2 += `<ul v-if="deepShow.show${i}"><li v-for="(item,index) in deepData.data${i}" @click="fn(item,${i},item.label,$event)" >{{item.label}}</li></ul>`
        };
        this.deepData['data0'] = this.initData;
        this.$options.template = `<div><div :class="classAry" @click="ulShow=!ulShow">{{value}}</div><div class="box" v-show="ulShow" >${str2}</div></div>`;
    },
    methods: {
        //获取数组维度的方法
        getDeep() {
            let y = null;
            let i = 1;
            let fn = function (data) {
                if (!Array.isArray(data)) {
                    return i
                }
                data.forEach(item => {
                    if (Array.isArray(item.children)) {
                        y = fn(item) + 1;
                        if (y > i) {
                            i = y
                        }
                    }
                });
                return i
            };
            return fn(this.initData);
        },
        fn(item, i, val, ev) {
            this.$set(this.deepValue, `value${i}`, val);
            if (typeof item.children == 'undefined') {
                let str = ''
                for (let index = 0; index <= i; index++) {
                    str += this.deepValue[`value${index}`]
                    if (index != i) {
                        str += '/'
                    }
                };
                this.value = str;
                this.classAry.push('input-active');
            };
            if (item.children) {
                this.deepShow[`show${i + 1}`] = true;
            }
            let j = i + 1;
            for (; j < this.deep; j++) {
                this.deepShow[`show${j+1}`] = false;
            }
            this.$set(this.deepData, `data${i+1}`, item.children);
            while (this.deepData[`data${i+2}`]) {
                this.$set(this.deepData, `data${i+2}`, [])
                i++;
            };
            this.classChange(ev);
        },
        classChange(ev) {
            let target = ev.target;
            let parent = target.parentNode;
            let childList = parent.childNodes;
            for (const iterator of childList) {
                if (iterator != target) {
                    iterator.classList.remove('hover')
                }
            }
            target.classList.add('hover');
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        list: [{
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                    value: 'yizhi',
                    label: '一致'
                }, {
                    value: 'fankui',
                    label: '反馈'
                }, {
                    value: 'xiaolv',
                    label: '效率'
                }, {
                    value: 'kekong',
                    label: '可控'
                }]
            }, {
                value: 'daohang',
                label: '导航',
                children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                }]
            }]
        }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
                value: 'axure',
                label: 'Axure Components'
            }, {
                value: 'sketch',
                label: 'Sketch Templates'
            }, {
                value: 'jiaohu',
                label: '组件交互文档'
            }]
        }]
    }
})
