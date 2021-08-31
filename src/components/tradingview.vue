<template>
<div class="trade-view-comp cont-box relative">
    <div v-show="isk" id="trade-view-root"></div>
</div>
</template>

<script>
import $ from "jquery";
import wsBus from "./../assets/wsBus";
import Datafeeds from "./../assets/myDatafeeds";

export default {
    name: "kline-comp",
    computed: {
        // klineSymbol() {
        //   return this.$util.getSession("pairsName") || "UB/UCT"; // 根据交易对重新绘制K线，动态赋值
        // },
    },
    components: {

    },
    data() {
        return {

            isk: true,
            widget: null,

            pairsName: "BTC/USDT",
            currentDetail: {},
            toCNY: null,
            main: ''
        };
    },
    destroyed() {
        wsBus.close();
    },
    created() {

        // 当前行情
        // this.$hub.$on("toTradingView", re => {
        //   // console.log(re);
        //   this.currentDetail = re;

        // });
        this.$hub.$on("tonewprice", re => {
            // console.log(re);
            this.currentDetail = re;
            this.main = re.trading.split("/")[1];

            //  // console.log(re)

        });

        //当前的人民币价格
        //  this.$hub.$on('rmbPrice', res=>{
        //         this.toCNY = res;
        //  });
    },
    mounted() {

        //  alert('min1'.toUpperCase())
        //  this.$hub.$on("Kline",(pairsName)=>{
        //       // console.log(pairsName);
        //        this.tradingViewInit();
        //          wsBus.init1()
        //  })

        let pairsName = window.sessionStorage.getItem("pairsName");

        if (pairsName != null) {
            this.pairsName = pairsName;
        }

        // 切换交易对
        // this.$hub.$on("pairsName", re => {
        //   this.pairsName = re;
        //   this.klineSymbol = re;
        //   this.tradingViewInit();
        // });

        // this.$hub.$on("currentPriceNew", re => {
        //      let main = this.pairsName.split('/')[1];
        //      if(main=='BTC' ||main=='ETH'){
        //          re = this.filter.toSubstr(re,9)-0;
        //      }else{
        //         re = this.filter.toSubstr(re,5)-0;
        //      }

        //      document.title = re +' | '+ this.pairsName +' | '+ main +'主站'
        // });

        wsBus.init1();

        this.tradingViewInit();
    },
    watch: {
        klineSymbol() {
            this.tradingViewInit();

        }
    },
    methods: {

        changeTime(val) {
            // console.log(val)
            this.widget.chart().setResolution(val);
        },

        tradingViewInit() {
            // alert(this.klineSymbol)

            this.Symbol = this.klineSymbol;

            let widget = new window.TradingView.widget({
                width: "100%",
                height: "100%",
                // fullscreen: false,
                // symbol: this.klineSymbol,
                symbol: this.Symbol,
                interval: localStorage.getItem("tradingview.interval") || "5",
                container_id: "trade-view-root",
                // datafeed: new Datafeeds(this.klineSymbol),
                datafeed: new Datafeeds(this.Symbol),
                library_path: "/chartTool/",
                locale: "zh",
                timezone: "Asia/Shanghai", // 设置时区
                drawings_access: {
                    type: "black",
                    tools: [{
                        name: "Regression Trend"
                    }]
                },
                allow_symbol_change: true,

                disabled_features: [
                    //off
                    "pane_context_menu",
                    "go_to_date",
                    "header_compare", //对比或叠加品种
                    "header_interval_dialog_button", //正在加载
                    "header_symbol_search",
                    "header_undo_redo",
                    "legend_context_menu",

                    "show_hide_button_in_legend",
                    "symbol_info",
                    "volume_force_overlay",
                    "items_favoriting",
                    "header_layouttoggle",
                    "symbol_search_hot_key",
                    "control_bar",
                    "save_chart_properties_to_local_storage",
                    "display_market_status",
                    "timeframes_toolbar",
                    "use_localstorage_for_settings",
                    "header_resolutions"
                    // 'create_volume_indicator_by_default'
                ],

                enabled_features: [
                    //on
                    "hide_last_na_study_output",
                    "use_localstorage_for_settings",
                    "dont_show_boolean_study_arguments",
                    "hide_last_na_study_output",
                    "header_screenshot", //截屏left
                    "header_indicators", //指标按钮
                    "header_fullscreen_button", //全屏按钮
                    "header_settings"
                ],
                studies_overrides: {},
                charts_storage_api_version: "1.1",
                client_id: "tradingview.com",
                user_id: "public_user_id",
                loading_screen: {
                    backgroundColor: "#181b2a"
                },
                toolbar_bg: "#062853", //工具栏背景色
                overrides: {
                    volumePaneSize: "small",
                    //  "paneProperties.legendProperties.showLegend":false, // 隐藏MA值
                    "paneProperties.legendProperties.showStudyValues": true,
                    "paneProperties.background": "#051933", // 图表背景色
                    "paneProperties.vertGridProperties.color": "#1f2943",
                    "paneProperties.horzGridProperties.color": "#1f2943",
                    "paneProperties.crossHairProperties.color": "#989898",
                    // "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#ffffff",
                    "header_widget_dom_node": "off",

                    // 实心k
                    "mainSeriesProperties.candleStyle.upColor": "#00bfa6",
                    "mainSeriesProperties.candleStyle.downColor": "#e52e5f",
                    "mainSeriesProperties.candleStyle.drawWick": true,
                    "mainSeriesProperties.candleStyle.drawBorder": true,
                    "mainSeriesProperties.candleStyle.borderColor": "#C400CB",
                    // "mainSeriesProperties.candleStyle.borderUpColor": "rgb(0, 255, 0)",
                    // "mainSeriesProperties.candleStyle.borderDownColor": "rgb(255, 0, 0)",
                    "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
                    "mainSeriesProperties.candleStyle.wickDownColor": "#ae4e54",
                    // 空心k
                    "mainSeriesProperties.hollowCandleStyle.upColor": "#00bfa6",
                    "mainSeriesProperties.hollowCandleStyle.downColor": "#e52e5f",
                    "mainSeriesProperties.hollowCandleStyle.drawWick": true,
                    // "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
                    // "mainSeriesProperties.hollowCandleStyle.borderColor": "#C400CB",
                    // "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#589065",
                    //'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#ae4e54',
                    "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#acaea4",
                    "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#589065",
                    // 'mainSeriesProperties.hollowCandleStyle.wickDownColor': '#ae4e54',
                    "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#acaea4",
                    "scalesProperties.lineColor": "#61688a",

                    "paneProperties.legendProperties.showSeriesTitle": false // 取消symbolInfo
                },
                custom_css_url: "./night.css"
            });

            this.widget = widget;
            widget.onChartReady(() => {
                let chart = widget.activeChart();
                chart.createStudy("Moving Average", false, false, [5], null, {
                    "Plot.color": "#965fc4",
                    "Plot.linewidth": 1
                });
                chart.createStudy("Moving Average", false, false, [10], null, {
                    "Plot.color": "#84aad5",
                    "Plot.linewidth": 1
                });
                chart.createStudy("Moving Average", false, false, [30], null, {
                    "Plot.color": "#55b263",
                    "Plot.linewidth": 1
                });
                chart.createStudy("Moving Average", false, false, [60], null, {
                    "Plot.color": "#b7248a",
                    "Plot.linewidth": 1
                });
                chart.onIntervalChanged().subscribe(null, (interval, obj) => {
                    localStorage.setItem("tradingview.interval", interval);
                });
                let buttonArr = [{
                        value: "1",
                        period: "1m",
                        text: "1min"
                    },
                    {
                        value: "5",
                        period: "5m",
                        text: "5min"
                    },
                    {
                        value: "15",
                        period: "15m",
                        text: "15min"
                    },
                    {
                        value: "30",
                        period: "30m",
                        text: "30min"
                    },
                    {
                        value: "60",
                        period: "1h",
                        text: "1hour"
                    },
                    {
                        value: "D",
                        period: "1D",
                        text: "1day"
                    },
                    {
                        value: "W",
                        period: "1W",
                        text: "1week"
                    }
                ];
                let btn = {};
                let nowTime = "";
                let handleClick = (e, value) => {
                    // console.log(value)
                    // debugger
                    // console.log(e.target)
                    // alert(value)
                    widget.chart().setResolution(value);

                    $(e.target)
                        .addClass("select")
                        .closest("div.space-single")
                        .siblings("div.space-single")
                        .find("div.button")
                        .removeClass("select");
                    setTimeout(() => {
                        // window.location.reload()
                    }, 300);
                    //
                };
                // 显示当前K线分辨率按钮
                buttonArr.forEach((v, i) => {
                    btn = widget.createButton().on("click", function (e) {
                        //  alert(v.value)
                        handleClick(e, v.value);
                    });
                    btn[0].innerHTML = v.text;
                    btn[0].title = v.text;

                    let klineTime = localStorage.getItem("klineTime");

                    let hour = 0,
                        day = 0,
                        week = 0;
                    if (klineTime.replace("H", "") == 1) {
                        hour = 60;
                    }
                    if (klineTime.replace("D", "") == 1) {
                        day = "D";
                    }
                    if (klineTime.replace("W", "") == 1) {
                        week = "W";
                    }
                    if (
                        v.value == klineTime.replace("MIN", "") ||
                        v.value == day ||
                        v.value == hour ||
                        v.value == week
                    ) {
                        // console.log(btn)
                        $(btn[0]).addClass("select");
                    }
                });
            });
        }
    }
};
</script>

<style>
.Transaction_pair {
    color: #00a2ff;
}

.cont-box .ceng999 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: red; */
}

#trade-view-root {
    height: 455px;
}

.Transaction_pair {
    color: #00a2ff;
}

.meiyuancolor {
    color: #b1efff;
}

.rmbcolor {
    color: #e6e6e6;
}

.zfcolor {
    color: #00f6ff;
}

.trading_top {
    background: #051933;
}
</style>
