/* 
 ******原生socket
 */

import wsBus from './wsBus'
import util from "./../assets/js/common";

const supportedResolutions = ['1', '5', '15', '30', '60', 'D', 'W'];
export default class {
    constructor(symbol) {
        // this.symbol = symbol
        this.lastBar = null;
    }
    //
    async onReady(callback) {
        let config = await Promise.resolve({
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: supportedResolutions, //支持的周期数组，周期可以是数字或字符串。 如果周期是一个数字，它被视为分钟数。 字符串可以是“*D”，“*W”，“_M”（_的意思是任何数字）。
            supports_marks: false, //布尔值来标识您的 datafeed 是否支持在K线上显示标记
        });
        callback(config);
    }
    unsubscribeBars(subscriberUID) {
        // console.log('unsubscribeBars =====>\n', ...arguments)
    }
    async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        // alert(util.getSession("pairsName"))
        // let main = util.getSession("pairsName").split('/')[1];
        let main = window.sessionStorage.getItem("pairsName").split('/')[1];

        let res = await Promise.resolve({
            name: symbolName,
            ticker: symbolName,
            type: 'bitcoin',
            "timezone": 'Asia/Shanghai',
            "minmov": 1, // 最小波动
            "pricescale": main == 'BTC' || main == 'ETH' ? 100000000 : 10000, // 价格刻度
            // "pricescale": 1000, // 价格刻度
            // "minmov2": 0.0001,
            // "pointvalue": 0.00000001,
            "session": "24x7",
            "has_intraday": true,
            "has_weekly_and_monthly": true,
            // "has_no_volume":false,
            // "description":"Apple Inc.",
            "supported_resolutions": supportedResolutions,
            // "intraday_multipliers": ['5', '15', '30', '60'],
            'has_empty_bars': true
        });
        onSymbolResolvedCallback(res);
    }
    async getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        // debugger

        let res = await wsBus.reqKlinHistory(symbolInfo.name, resolution, from, to)
        // console.log(res)
        // if (!res.getKlines) return onHistoryCallback([], {noData: true})
        let bars = [];
        let meta = {
            noData: false,
        }
        // debugger

        // console.log(res.Data.length )
        if (res.Data.length < 1) {
            meta.noData = true;
            // meta.nextTime = res.nextTime; // 如果没有数据，应该有nextTime
        } else {
            // console.log(res.Data);
            bars = res.Data.map(obj => ({
                time: obj.time,
                open: obj.open,
                close: obj.close,
                high: obj.high,
                low: obj.low,
                volume: obj.volume
            }));
        }
        onHistoryCallback(bars, meta);
    }
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        wsBus.$on('subscribeBar', klines => {


            // console.log("=======================================================");
            // console.log(klines);
            // let {time, open, close, low, high, vol} = klines.getKlines[0]
            // let {time, open, close, low, high, vol} = klines;
            function sum() {
                let m = 1;
                let n = 20;
                let num = Math.floor(Math.random() * (m - n) + n);
                return num
            }

            let time = klines.time;
            let open = klines.open;
            let close = klines.close;
            let low = klines.low;
            let high = klines.high;
            let volume = klines.volume;
            onRealtimeCallback({
                time,
                open,
                close,
                low,
                high,
                volume
            });

            // onRealtimeCallback({
            //   time: 1537268220000 ,
            //   open:  5,
            //   close:7,
            //   low:1,
            //   high:10,
            //   volume: 200
            // });
        });
    }
}