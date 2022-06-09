const test = false; //PC
// const test = true; //真机

// const baseURL = 'http://api.xxqq.top';
const baseURL = 'http://m.metacurrency.trade/api'  // 线上测试环境
// const baseURL = '/api'; //本地测试

// const coinURL = 'http://127.0.0.1:6013';
const coinURL = 'http://104.168.190.243:6013';

// const wsURL = 'ws://127.0.0.1:8090/wss'; //本地测试
const wsURL = 'ws://api.xxqq.top/wss'; //线上测试


export default {
    coinURL,
    baseURL,
    wsURL,
    test
}
