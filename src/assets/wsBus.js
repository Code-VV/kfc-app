/* 
 ******原生socket
 */

import Vue from 'vue'

import {
    promiseBreaker
} from "./tools.js";
import util from "./../assets/js/common";
import config from "../config"

const wsUrl = config.wsURL;

// 处理数据
// function handerWsData(arr) {
//     let data = arr.map(ele => {
//         ele = ele.split("|")
//         return {
//             high: ele[0],
//             open: ele[1],
//             low: ele[2],
//             close: ele[3],
//             volume: ele[4],
//             time: ele[5]

//         }
//     })
//     return data
// }

// let arr = ["12.32|12.00|13.21|14.21|12.44|1234567890",
//     "14.32|14.00|15.21|13.21|14.74|1134567890"
// ]

// console.log(handerWsData(arr))

let wsBus = window.wsBus = new Vue({
    // store,
    data: {
        timer3: null,
        self_CLOSE: false,
        aaa: 0,
        count: 0,
        ws: null,
        connectReady: promiseBreaker(), // 将是可外部决议的promise
        from: 0,
        to: 0,
        period: util.toL(window.localStorage.getItem('klineTime') || 'min5'),
        // period: 'min5',
        lockReconnect: false, //避免重复连接
        tt: null
    },
    computed: {
        klineSymbol() {
            return window.sessionStorage.getItem('pairsName'); // 根据交易对重新绘制K线，动态赋值
        }
    },

    mounted() {

    },

    watch: {

    },
    methods: {
        handerParseName(time) {
            let name = window.sessionStorage.getItem('pairsName');
            if (time != undefined) {
                return name.split('/')[1].toLowerCase() + '/' + name.split('/')[0].toLowerCase() + '/' + time.toLowerCase()
            } else {
                return name.split('/')[1].toLowerCase() + '-' + name.split('/')[0].toLowerCase()
            }
        },
        // 去重
        arrayUnique2(arr, name) {

            var hash = {};

            return arr.reduce(function(item, next) {

                hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);

                return item;

            }, []);

        },
        close() {
            this.self_CLOSE = true;
            this.ws.close();
            clearInterval(this.timer3)
        },

        // send(val){

        //     let _this = this;

        //     _this.klineSymbol = val;


        //     _this.ws.send(JSON.stringify({
        //         method: "initKline",
        //         param: _this.period,
        //         market: _this.window.sessionStorage.getItem('pairsName'),
        //         startTime: _this.from * 1000,
        //         endTime: _this.to * 1000
        //     }))
        //     setTimeout(()=>{
        //          _this.ws.send(JSON.stringify({ method: "getKline",
        //          startTime: _this.from * 1000,
        //          endTime: _this.to * 1000,
        //           param: _this.period, market: _this.window.sessionStorage.getItem('pairsName') }));
        //     },1500)

        // },

        init1() {

            let _this = this;
            try {
                let ws = _this.ws = new WebSocket(wsUrl);
                ws.onclose = function() {
                    // console.log('链接关闭');
                    _this.connectReady = promiseBreaker()

                    reconnect();
                };
                ws.onerror = function() {
                    // console.log('发生异常了');
                    reconnect();
                };
                ws.onopen = function() {
                    //心跳检测重置
                    // console.log(_this.connectReady)
                    _this.connectReady.resolve();

                    heartCheck.start();

                    _this.ws.send('initKline-BTC/USDT-1m-1577313180000-1577755149000')

                    _this.timer3 = setInterval(() => {
                        _this.ws.send("PING")
                    }, 10000);
                };
                // ws.onmessage = function(e) {
                //     // console.log('接收到消息');
                //     // console.log(e.data)
                //     heartCheck.start();
                // }

                ws.onmessage = function(e) {
                    heartCheck.start();
                    if (e.data == 'PONG') {
                        return
                    }


                    //解压base64 拆分->解压->拼接。
                    function unzip(b64Data) {
                        var strData = atob(b64Data);

                        var charData = strData.split('').map(function(x) {
                            return x.charCodeAt(0);
                        });
                        // Turn number array into byte-array
                        var binData = new Uint8Array(charData);
                        // console.log(binData)

                        // // unzip
                        var data = pako.inflate(binData);
                        // Convert gunzipped byteArray back to ascii string:
                        // strData   = String.fromCharCode.apply(null, new Uint16Array(data));
                        let array = new Uint16Array(data)
                            // console.log(array)

                        var res = '';
                        var chunk = 8 * 1024;
                        var i;
                        for (i = 0; i < array.length / chunk; i++) {
                            res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
                        }
                        res += String.fromCharCode.apply(null, array.slice(i * chunk));

                        strData = res
                        return strData;
                    }

                    // ArrayBuffer 转buffer
                    function toBUffer(ab) {
                        var buf = new Buffer(ab.size);
                        var view = new Uint8Array(ab);
                        for (var i = 0; i < buf.length; ++i) {
                            buf[i] = view[i]
                        }
                        return buf
                    }






                    let blob = e.data;
                    //   // console.log(typeof(blob));
                    // if (typeof (blob) == 'string') return;
                    // console.log(blob);

                    let newblob = blob.slice(0, blob.size);

                    //js中的blob没有没有直接读出其数据的方法，通过FileReader来读取相关数据
                    let reader = new FileReader();
                    reader.readAsBinaryString(newblob);
                    reader.onload = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            let res = evt.target.result; //base64
                            let msg = JSON.parse(unzip(res));
                            // console.log('--------------------------------------------------');
                            // console.log(msg);

                            if (msg.method && msg.method === "oneKline") {
                                // return;

                                let obj = JSON.parse(msg.data[0])
                                let msg2 = new Object();
                                msg2['high'] = obj.high - 0;
                                msg2['low'] = obj.low - 0;
                                msg2['method'] = msg.method;
                                msg2['open'] = obj.open - 0;
                                msg2['param'] = msg.pairs;
                                msg2['time'] = obj.time - 0;
                                msg2['volume'] = obj.volume - 0;
                                msg2['close'] = obj.close - 0;
                                // console.log(msg2);
                                _this.$emit('subscribeBar', msg2);
                                _this.$hub.$emit('tokline', msg2);


                            } else if (msg.method && msg.method === "initKline") {

                                let initKlineList = [];
                                let data = msg.data;
                                //  // console.log(data)
                                let msg1 = {};
                                initKlineList = data.map(obj => {
                                    obj = JSON.parse(obj)
                                    return {
                                        time: obj.time - 0,
                                        open: obj.open - 0,
                                        close: obj.close - 0,
                                        high: obj.high - 0,
                                        low: obj.low - 0,
                                        volume: obj.volume - 0
                                    }
                                });
                                // 时间去重
                                initKlineList = _this.arrayUnique2(initKlineList, "time")
                                    //   // console.log(initKlineList)

                                msg1.Data = initKlineList;
                                msg1.method = "initKline";
                                msg1.param = msg.pairs;
                                // console.log(msg1)
                                localStorage.setItem('klineTime', msg1.param);

                                _this.$emit('klineHistoryData', msg1);
                            } else {


                            }
                        }

                    }

                }






            } catch (e) {
                reconnect();
            }


            function reconnect() {
                if (_this.self_CLOSE) { //自愿离开
                    return
                }
                if (_this.lockReconnect) {
                    return;
                };
                _this.lockReconnect = true;
                //没连接上会一直重连，设置延迟避免请求过多
                _this.tt && clearTimeout(_this.tt);
                _this.tt = setTimeout(function() {
                    _this.init1()
                    _this.lockReconnect = false;
                }, 5000);
            }

            //心跳检测
            var heartCheck = {
                timeout: 10000,
                timeoutObj: null,
                serverTimeoutObj: null,
                start: function() {
                    // console.log('start');
                    var self = this;
                    this.timeoutObj && clearTimeout(this.timeoutObj);
                    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                    this.timeoutObj = setTimeout(function() {
                        //这里发送一个心跳，后端收到后，返回一个心跳消息，
                        //  // console.log('这里发送一个心跳，后端收到后，返回一个心跳消');

                        // _this.ws.send(JSON.stringify({
                        //     method: "initKline",
                        //     param: _this.period,
                        //     market: window.sessionStorage.getItem('pairsName'),
                        //     startTime: _this.from * 1000,
                        //     endTime: _this.to * 1000
                        // }))
                        // _this.ws.send('initKline-BTC/USDT-1m-1577313180000-1577755149000')



                        self.serverTimeoutObj = setTimeout(function() {
                            // console.log(111);

                            _this.ws.close();
                            // createWebSocket();
                        }, self.timeout);

                    }, this.timeout)
                }
            }






        },

        async reqKlinHistory(symbol, resolution, from, to) { // 请求k线历史数据
            this.to = to;
            await this.connectReady
            this.from = from;
            if (resolution > 0 && resolution < 60) {
                this.period = "min" + resolution
            } else if (resolution == 60) {
                this.period = "H1";
            } else if (resolution == "D") {
                this.period = "D1";
            } else if (resolution == "W") {
                this.period = "W1";
            }
            let res = await new Promise((resolve, reject) => {
                this.$on('klineHistoryData', (msg) => {
                    resolve(msg)
                    // console.log(msg)
                });
                this.ws.send('initKline-BTC/USDT-1m-1577313180000-1577755149000')

            });
            return res;
        }
    },
    created() {


    }

})
export default wsBus;