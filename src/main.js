import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Apps from './Apps.vue'
import router from './router'
import store from './store/index'
import '@/assets/text/text.css'

// 复制插件
import VueClipboard from 'vue-clipboard2'

import {
    Get,
    Post,
    Post1
} from './api/request'
import filters from './assets/js/filter'
import commons from './assets/js/common'
import './plugins/vant.js'
import 'lib-flexible'
import './plugins/gt.js'
import '@/assets/scss/for_style.css'
import {
    Toast,
    Dialog
} from 'vant';
import nodata from '@/components/nodata.vue'
import chat from '@/components/chat.vue'
import geet from "@/components/geet.vue"
import MescrollVue from 'mescroll.js/mescroll.vue'
import VueI18n from 'vue-i18n'
import global from './api/global'
import config from './config'
import '@babel/polyfill';
import axios from './axios/index'


// import mui from "./assets/js/mui/js/mui.min.js"
// import "./assets/js/mui/css/mui.min.css"


async function onloadVue(){
    let err = 0
    let htmlState = localStorage.getItem('htmlState')
    if(!htmlState || htmlState == 1){
        let statefun = await axios({
            url:"data/data/getonoff",
            methods: 'get',
            timeout: 6000
        }).catch(() => {
            err = 1
            htmlState = 1
        })
        if(err == 0){
            if(statefun.result == 1){
                htmlState = 0
            }else{
                htmlState = 1
            }
            
        }
        localStorage.setItem('htmlState', htmlState)
    }
    
// Vue.prototype.$mui = mui
    
Vue.use(Dialog)
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(VueClipboard) //通过插件的形式挂载  复制代码插件
    // Vue.use(Dialog)
const i18n = new VueI18n({
    locale: localStorage.getItem('currentLangue') || 'en', // 语言标识, // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh': require('./assets/lang/zh.js'), // 中文语言包
        'en': require('./assets/lang/en.js'), // 英文语言包
        'zh_f': require('./assets/lang/zh_f.js') // 英文语言包
    }
})


Toast.setDefaultOptions({
    duration: 1000
});


Vue.config.productionTip = false
    // 全局导入过滤器
Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
    // 定义vue全局变量
Vue.prototype.$get = Get // API请求
Vue.prototype.$post = Post // API请求
Vue.prototype.$post1 = Post1 // API请求

// 极验
Vue.prototype.$initGeet = initGeetest;

Vue.prototype.$commons = commons
Vue.prototype.Toast = Toast
Vue.prototype.Dialog = Dialog
Vue.prototype.$util = commons
Vue.prototype.$hub = window.MV = new Vue();
// 白天黑夜颜色值 主色调
Vue.prototype.$bg_night = '#171E28'
Vue.prototype.$bg_day = '#fff'

// 白天黑夜颜色值 副色调
Vue.prototype.$bg_night_second = '#1E2633 '
Vue.prototype.$bg_day_second = '#fff'
Vue.prototype.$GLOBAL = global;

// <!-- Allen 测试环境 true -->
Vue.prototype.$test = config.test;

Vue.prototype.$no_bb = false; //不要币币 true不要  false要
Vue.prototype.$no_fb = false; //不要法币 true不要  false要


// 这是判断账号是否冻结的方法    涉及到交易的地方都有使用
Vue.prototype.changeData = function(type) {
    if (window.localStorage.getItem("status") == "UNNORMAL") {
        // alert(type)
        switch (type) {
            //币币
            case 'Conins':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //合约
            case 'Contract':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //期权
            case 'Options':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //充币
            case 'Recharge':
                Dialog.alert({
                    message: window.vm.$t('dj.txdj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
            case 'Withdrawal':
                Dialog.alert({
                    message: window.vm.$t('dj.txdj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //划转
            case 'Transfer':
                Dialog.alert({
                    message: window.vm.$t('dj.txdj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //私募
            case 'Privateplacement':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
                //质押
            case 'Pledge':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
        }

    } else if (window.localStorage.getItem("status") == "NOOPTION") {
        switch (type) {
            // 期权
            case 'Options':
                Dialog.alert({
                    message: window.vm.$t('dj.jydj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
        }
    } else if (window.localStorage.getItem("status") == "CANNOTWITDRAWMONEY") {
        switch (type) {
            case 'Withdrawal':
                Dialog.alert({
                    message: window.vm.$t('dj.txdj'),
                    confirmButtonText: window.vm.$t('dj.qd'),
                }).then(() => {
                    // on close
                });
                throw SyntaxError("错误提示，因为该账号已被冻结！");
                break;
        }
    } else if (type == "NOLOGIN") {
        Dialog.alert({
            message: window.vm.$t('dj.tcdr'),
            confirmButtonText: window.vm.$t('dj.qd'),
        }).then(() => {
            // on close
        });
    }
}

Toast.setDefaultOptions({
    className: 'aa'
});
// 全局组件
// 1.无数据
Vue.component('nodata', nodata)
    //上拉加载下拉刷新
Vue.component('MescrollVue', MescrollVue)
    // 聊天
Vue.component('chat', chat)
    // 极验
Vue.component('geet', geet)



// 跳转后返回顶部
router.afterEach((to, from, next) => {
    Toast.clear();
    window.scrollTo(0, 0);
});

if(htmlState == 0){
    window.vm = new Vue({
        router,
        i18n,
        store,
        render: h => h(App),
        methods: {
            status() {
    
                // console.log("a");
                alert("a")
                return;
            }
        }
    })
}else{
    window.vm = new Vue({
        router,
        i18n,
        store,
        render: h => h(Apps),
        methods: {
            status() {
    
                // console.log("a");
                alert("a")
                return;
            }
        }
    })
}


if(htmlState == 1){
    if (!config.test) {
        window.vm.$mount('#app')
    } else {
        window.apiready = () => {
            new Vue({
                router,
                i18n,
                store,
                render: h => h(App)
            }).$mount("#app");
        }
    }
}else{
    if (!config.test) {
        window.vm.$mount('#app')
    } else {
        window.apiready = () => {
            new Vue({
                router,
                i18n,
                store,
                render: h => h(Apps)
            }).$mount("#app");
        }
    }
}
}

onloadVue()




