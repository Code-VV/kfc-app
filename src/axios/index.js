import axios from 'axios'
import router from '../router'
import {
    Toast
} from 'vant';
import store from '../store/index'
import config from '../config'
axios.defaults.baseURL = config.baseURL;

axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['token'] = 'ff2d9ba0b706429ba1d91b54c0c55cef';
// axios.defaults.headers['userId'] = '44efcf605afad2f820da8ca9e007fdf6';
// 响应拦截
axios.interceptors.response.use((res) => {
    setTimeout(() => {
            Toast.clear();
        }, 1000)
        // console.log(res)
    let data = res.data;
    let code = data.errorCode;
    let errorMessage = data.errorMessage;
    switch (code) {
        case '0':
            // data.msg && ElementUI.Message({
            //     message: data.msg,
            //     type: "error"
            // });
            break;
        case 'SYS.0015':
            if (errorMessage != window.vm.$t('xylj.mmyw')) { //修改用户支付密码报这个错
                window.localStorage.removeItem('userId');
                window.localStorage.removeItem('token');
                store.dispatch('setLogin', false);
                // Toast(window.vm.$t('xylj.drgq'))
                store.dispatch('setShowHeadPopup', false);
                setTimeout(() => {
                    router.push('/login');
                }, 500)
            }
            break;
    }
    return data;
}, (error) => {
    setTimeout(() => {
        Toast.clear();
    }, 1000)
    let status = error.response && error.response.data.errorCode || '';
    switch (status) {
        case 500:
            // Toast(error.errorMessage)
            break;
        case 'SYS.0015':
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('token');

            store.dispatch('setLogin', false);
            // Toast(window.vm.$t('xylj.drgq'))
            store.dispatch('setShowHeadPopup', false);
            // setTimeout(res => {
            //     router.push('/login');
            // }, 500)
            break;
        default:
            // Toast('服务器异常，请稍后重试')
    }
    return Promise.reject(error);
});
// 请求拦截
axios.interceptors.request.use(function(config) {
    // 极验不添加请求头
    if (config.url.indexOf("geetest") === -1) {
        config.headers['token'] = window.localStorage.getItem('token');
        config.headers['userId'] = window.localStorage.getItem('userId');
    }
    return config
}, function(fail) {
    // error
})

export default axios;