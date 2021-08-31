function loadView(view) {
    return () =>
        import (`@/views/${view}.vue`);
}

export default [{
        path: '/login',
        name: 'login',
        component: loadView('login/index')
    },
    {
        path: '/register',
        name: 'register',
        component: loadView('register/index')
    },
    {
        path: '/forget',
        name: 'forget',
        component: loadView('forget-password/index')
    },

    {
        path: '/setting',
        name: 'setting',
        component: loadView('me/seeting')
    },

    {
        path: '/message',
        name: 'message',
        component: loadView('message/index')
    },

    {
        path: '/langue',
        name: 'langue',
        component: loadView('me/langue-select')
    },

    { //付款方式
        path: '/payment',
        name: 'payment',
        component: loadView('me/payment/index'),
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    //银行卡
    {
        path: '/payment/bankCard',
        name: 'bankCard',
        component: loadView('me/payment/bankCard')
    },
    //微信
    {
        path: '/payment/weixin',
        name: 'weixin',
        component: loadView('me/payment/weixin')
    },
    //支付宝
    {
        path: '/payment/zhifubao',
        name: 'zhifubao',
        component: loadView('me/payment/zhifubao')
    },


    // 账户中心 --------start
    {
        path: '/accountCenter',
        name: 'accountCenter',
        component: loadView('me/account-center/index')
    },

    // 1.绑定账号 1
    {
        path: '/accountCenter/bind',
        name: 'bind',
        component: loadView('me/account-center/bind-account')
    },
    // 1.绑定账号 2
    {
        path: '/accountCenter/bindSecond',
        name: 'bindSecond',
        component: loadView('me/account-center/bind-account-second')
    },

    // 2.修改密码
    {
        path: '/accountCenter/change',
        name: 'change',
        component: loadView('me/account-center/change-password')
    },

    // 3.设置交易密码
    {
        path: '/accountCenter/postPasswordSet',
        name: 'postPasswordSet',
        component: loadView('me/account-center/post-password-set')
    },
    // 4.修改交易密码
    {
        path: '/accountCenter/postPasswordChange',
        name: 'postPasswordChange',
        component: loadView('me/account-center/post-password-change')
    },
    // 5.忘记交易密码
    {
        path: '/accountCenter/postPasswordForget',
        name: 'postPasswordForget',
        component: loadView('me/account-center/post-password-forget')
    },
    // 5.谷歌验证
    {
        path: '/accountCenter/googleAuthenticator',
        name: 'googleAuthenticator',
        component: loadView('me/account-center/googleAuthenticator')
    },
    //关闭谷歌验证
    {
        path: '/accountCenter/closeGoogle',
        name: 'closeGoogle',
        component: loadView('me/account-center/closeGoogle')
    },

    // 账户中心 --------end


    // k线图
    {
        path: '/kline',
        name: 'kline',
        component: loadView('tradingView/index')
    },

    // 订单管理
    {
        path: '/orderManger',
        name: 'orderManger',
        component: loadView('me/order-manger')
    },
    //后面添加的期权合约
    {
        path: '/qiquan/index',
        name: 'qiquan',
        component: loadView('qiquan/index')
    },
    {
        path: '/qiquan/Entrance',
        name: 'qiquan',
        component: loadView('qiquan/Entrance')
    }
]