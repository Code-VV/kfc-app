const test = false; //PC
// const test = true; //真机

const baseURL = 'http://api.nasdaqs.vip/'; //线上SYTOG
// const baseURL = '/api'; //本地测试


const wsURL = 'ws://api.nasdaqs.vip/wss'; //线上SYTOG
// const wsURL = 'ws://129.226.15.156:8782/ws'; //本地测试



export default {
    baseURL,
    wsURL,
    test
}