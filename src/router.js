import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import routers from './router/index'



Vue.use(Router)

function loadView(view) {
    return () => import(`@/views/${view}.vue`);
}

let routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/noticeList', //公告列表
        name: 'noticeList',
        component: loadView('assets/noticeList'),
    },
    {
        path: '/noticeDetail', //公告详情
        name: 'noticeDetail',
        component: loadView('assets/noticeDetail'),
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: loadView('me/about'),
    },
    {
        path: '/realname', //实名认证
        name: 'realname',
        component: loadView('me/realname'),
    },

    {
        path: '/realname1', //高级实名认证
        name: 'realname1',
        component: loadView('me/realname1'),
    },
    {
        path: '/personalCenter', //个人中心
        name: 'personalCenter',
        component: loadView('me/personalCenter'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/chooseArea', //选择国家
        name: 'chooseArea',
        component: loadView('me/chooseArea'),
    },
    {
        path: '/customer', //客服
        name: 'customer',
        component: loadView('me/customer'),
    },
    {
        path: '/agreement', //注册协议
        name: 'agreement',
        component: loadView('register/agreement'),
    },
    {
        path: '/downloadApp', // 下载app
        name: 'downloadApp',
        component: loadView('downloadApp/index')
    },
    {
        path: '/aboutAgreement', //隐私协议
        name: 'aboutAgreement',
        component: loadView('me/aboutAgreement'),
    },
    {
        path: '/otc365agreement', //365协议
        name: 'otc365agreement',
        component: loadView('transaction/otc365agreement'),
    },

    {
        path: '/invitation', //邀请
        name: 'invitation',
        component: loadView('me/invitation')
    },
    {
        path: '/helpCenter', //帮助中心
        name: 'helpCenter',
        component: loadView('me/helpCenter')
    },
    {
        path: '/shenshou', //神兽
        name: 'shenshou',
        component: loadView('shenshou/index'),

        meta: {
            showTabbar: true
        }

    },
    {
        path: '/helpCenterDetail1', //帮助中心新手攻略详情
        name: 'helpCenterDetail1',
        component: loadView('me/helpCenterDetail1')
    },
    {
        path: '/helpCenterDetail2', //
        name: 'helpCenterDetail2',
        component: loadView('me/helpCenterDetail2')
    },
    {
        path: '/helpCenterDetail3', //
        name: 'helpCenterDetail3',
        component: loadView('me/helpCenterDetail3')
    },
    {
        path: '/helpCenterDetail4', //
        name: 'helpCenterDetail4',
        component: loadView('me/helpCenterDetail4')
    },
    {
        path: '/quotes',
        name: 'quotes',
        component: loadView('quotes/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/quotes/quotesDetail',
        name: 'quotesDetail',
        component: loadView('quotes/quotesDetail')
    },
    {
        path: '/exchange',
        name: 'exchange',
        component: loadView('exchange/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/transaction', //交易
        name: 'transaction',
        component: loadView('transaction/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/transaction/allTransaction', //全部交易
        name: 'allTransaction',
        component: loadView('transaction/allTransaction')
    },
    {
        path: '/transaction/otcOrder', //OTC订单列表
        name: 'otcOrder',
        component: loadView('transaction/otcOrder'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/transaction/orderDetail', //OTC订单列表单详情
        name: 'orderDetail',
        component: loadView('transaction/orderDetail')
    },
    {
        path: '/transaction/appeal', //申诉
        name: 'appeal',
        component: loadView('transaction/appeal')
    },
    {
        path: '/transaction/merchantAudit', //商户认证
        name: 'merchantAudit',
        component: loadView('transaction/merchantAudit')
    },
    {
        path: '/transaction/transactionFabi', //法币交易
        name: 'transactionFabi',
        component: loadView('transaction/transactionFabi'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    }, {
        path: '/transaction/transactionFabi1', //法币交易
        name: 'transactionFabi1',
        component: loadView('transaction/transactionFabi1'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/merchantAgreement', //商户协议
        name: 'merchantAgreement',
        component: loadView('transaction/agreement'),
    },
    {
        path: '/transactionDetail', //买入卖出
        name: 'transactionDetail',
        component: loadView('transaction/transactionDetail'),
    },
    {
        path: '/advertisement', //广告
        name: 'advertisement',
        component: loadView('transaction/advertisement'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/huilv', //商户协议
        name: 'huilv',
        component: loadView('huilv/huilv'),
    },
    {
        path: '/merchantAgreement', //商户协议
        name: 'merchantAgreement',
        component: loadView('transaction/agreement'),
    },
    {
        path: '/contract',
        name: 'contract',
        component: loadView('contract/index'),
        // meta: {
        //     keepAlive: false // 需要被缓存
        // }
    },
    {
        path: '/contract/allContract', //全部合约
        name: 'allContract',
        component: loadView('contract/allContract'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/activity', //活动
        name: 'activity',
        component: loadView('activity/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/activityHistory', //活动历史记录
        name: 'activityHistory',
        component: loadView('activity/activityHistory'),
    },
    {
        path: '/mortgage', //质押
        name: 'mortgage',
        component: loadView('mortgage/mortgage'),
    },
    {
        path: '/mort_record', //质押记录
        name: 'mortRecord',
        component: loadView('mortgage/record')
    },
    {
        path: '/redeem_record', //赎回记录
        name: 'redeemRecord',
        component: loadView('redeem/record')
    },
    {
        path: '/activityDetails', //活动详情
        name: 'activityDetails',
        component: loadView('activity/activityDetails'),
    },
    {
        path: '/assets', //资产
        name: 'assets',
        component: loadView('assets/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/assets/assetsIndex', //资产
        name: 'assetsIndex',
        component: loadView('assets/assetsIndex'),
    },
    {
        path: '/assets/assetDetail', //资产详情
        name: 'assetDetail',
        component: loadView('assets/assetDetail'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/assets/chooseCoin', //选择币
        name: 'chooseCoin',
        component: loadView('assets/chooseCoin'),
    },
    {
        path: '/assets/coinCharging', //充币
        name: 'coinCharging',
        component: loadView('assets/coinCharging')
    },
    {
        path: '/assets/withdrawCoin', //提币
        name: 'withdrawCoin',
        component: loadView('assets/withdrawCoin')
    },
    // {
    //     path: '/assets/wxscanline', //扫一扫
    //     name: 'wxscanline',
    //     component: loadView('assets/wxscanline'),
    //     meta: {
    //         keepAlive: true // 需要被缓存
    //     }
    // },
    {
        path: '/assets/withdrawCoinSuccess', //提币成功
        name: 'withdrawCoinSuccess',
        component: loadView('assets/withdrawCoinSuccess')
    },
    {
        path: '/assets/transfer', //划转
        name: 'transfer',
        component: loadView('assets/transfer')
    },
    {
        path: '/assets/tranferSuccess', //划转成功
        name: 'tranferSuccess',
        component: loadView('assets/tranferSuccess'),

    },
    {
        path: '/assets/capitalRecords', //资金记录
        name: 'capitalRecords',
        component: loadView('assets/capitalRecords')
    },
    {
        path: '/assets/capitalRecordsDetail', //资金记录详情
        name: 'capitalRecordsDetail',
        component: loadView('assets/capitalRecordsDetail'),
    },




]

routes = routes.concat(routers)

export default new Router({
    routes
})