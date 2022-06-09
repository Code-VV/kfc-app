module.exports = {
    // api.js
    api: {
        fail: "failure",
        codesuccess: "SMS verification code has been sent, please check",
        mailcodesuccess: "The email verification code has been sent, please check it.",
        tip1: "Wrong request",
        tip2: "Authorization expired, please log in again",
        tip3: "access denied",
        tip4: 'Request error, the resource was not found',
        tip5: 'Request method not allowed',
        tip6: "Request timed out",
        tip7: "Server side error",
        tip8: "Network not implemented",
        tip9: "Network Error",
        tip10: "service is not available",
        tip11: "network timeout",
        tip12: "The http version does not support this request",
        tip13: "Connection failure"
    },
    // 通用
    common: {
        home: 'Home', //首页   
        Markets: 'Markets', //  行情  
        trading: 'Trade', //币币
        activity: 'Activity', // 活动
        balance: 'Balance', //  资产
        my: 'My', //我的 
        deposit: 'Deposit', //  充币
        Market: 'Market', //   币币行情 
        ChangeList: 'Change List', //  涨跌幅
        Withdraw: 'Withdraw', //  提币
        Buy: 'Buy', // 买入 
        Sell: 'Sell', //  卖出
        Price: 'Price', //  价格
        Amount: 'Amount', //  数量
        Transfer: 'Transfer', // 划转 
        Available: 'Available', //  可用
        ExecutionAmount: 'Execution Amount', //  交易额
        Side: '方向', // Side 
        Marketorder: 'Market order', //市价委托
        Openorders: 'Open orders', //  未成交委托 
        History: 'History', //  历史委托
        Limitorder: 'Limit order', //  限价委托
        Trade: 'Trade', // 交易 
        Positions: 'Positions', //持仓  
        Orders: 'Orders', //  委托
        Records: 'Records', //  历史记录
        OpenLong: 'Open Long', //开多  
        OpenShot: 'Open Short', // 开空
        CloseLong: 'Close Long', // 平多 
        CloseShot: 'Close Short', // 平空
        currentOrders: 'Open Orders', //  当前委托
        Bull: 'Bull', //  看涨
        Bear: 'Bear', //  看跌
        Open: 'Open', //  开仓
        Close: 'Close', //平仓  
        Securitycenter: 'Security center', //  安全中心
        Margin: 'Margin', //  占用保证金
        MaxLots: 'Max Lots', // 可开手数 
        IDverification: 'ID verification', //  实名认证
        ndexPrice: 'Index Price', // 指数价格 
        Contracts_Lots: 'Contracts(Lots)', // 数量(手) 
        Lots: 'Lots', // 手
        Paymentmethod: 'Payment method', //  收款方式
        OrdinaryOrder: 'Ordinary Order', // 普通委托
        Swap: 'Swap', // 永续
        Fees: 'Fees', // 手续费
        Trigger: 'Trigger', // 止盈
        Ord: 'Ord', //止损 
        Leverage: 'Leverage', // 杠杆
        Mining: 'Mining', // 挖矿
        RiskLevel: 'Risk Level', // 风险度
        ContractTypes: 'Contract Types', // 合约类型：
        MiningPools: 'Mining Pools', // 矿池
        Cancel: 'Cancel' // 撤销
    },
    // 首页
    home: {
        kjmb: "Moneda de compra rápida",
        zhbz: "Admite BTC, USDT, ETH, etc.",
        kscb: "Depósito rápido",
        bzzx: "Centro de actividades",
        mc: "Nombre",
        zxj: "Precio más reciente",
        zxjCNY: "Precio más reciente (CNY)",
        xjl24h: "Volumen de 24 horas",
        zdf: "Levántate y cae",
        zfb: "Aumentar lista",
        cjeb: "Lista de ventas",
        xbb: "Nueva lista de divisas",
    },
    // 设置
    seeting: {
        langue: 'Language', //语言
        settings: 'Settings', //设置
        exit: 'Log Out', // 安全退出
        Valuation_method: 'Valuation method', //计价方式
        chineseYuan: 'Chinese Yuan', //人民币
        color: 'Color', // 涨跌色
        greeUp: 'Green up and red down', // 绿涨红跌
        redUp: 'Red up and green down', // 红涨绿跌
    },
    // 右侧弹窗
    headerPopup: {
        clickLogin: 'Click to Login', //点击登录 
        wecome: 'Welcome to Meta Currency', // 欢迎来到Meta Currency
        Deposit: 'Deposit', // 
        Withdraw: 'Withdraw', // 提币
        Transfer: 'Transfer', // 划转
        IDverification: 'ID verification', //身份认证
        invitefriends: 'Invite friends', // 邀请好友
        Accountcenter: 'Account center', // 账户中心
        Customerservice: 'Customer service', // 客服咨询
        aboutus: 'About us', // 关于我们
        settings: 'Settings', // 设置
        Helpcenter: 'Help center', //帮助中心
        Shareapplication: 'Share application', //分享应用
    },
    // 身份认证
    realname: {
        IDverification: 'ID verification', //身份认证
    },



    // 表单相关
    form: {
        submit: 'Submit', // 提交
        cancel: 'Cancel', //取消
        Select_from_phone_album: 'Album', //从手机相册选择
        Take_a_picture: 'Camera', //拍照

        in_your_name: 'Enter name', //请输入姓名
        in_your_Id: 'Enter ID number', //请输入身份证号
        phone: 'Mobile phone', // 手机
        mail: 'E-mail', //邮箱

        enter_number: 'Enter phone number', // 请输入手机号
        input_email: 'please input your email', // 请输入邮箱
        Next_step: 'Next step', // 下一步
        phone_format: 'Enter the correct phone format', // 输入正确的手机格式

        email_format: 'Enter the correct email format', // 输入正确的邮箱格式
        Phone_or_email: 'Tel/E-mail', // 手机号/ 邮箱
        Enter_phoneOrEmail: 'Enter Tel / E-mail', // 请输入手机号/邮箱
        Verification_code: 'Verification code', // 验证码

        Enter_confirmation_code: 'Enter confirmation code', // 请输入验证码
        New_transaction_password: 'New transaction password', // 新交易密码
        Enter_6_digit_characters: 'Enter 6 digit characters', // 请输入6位数字字符
        confirm_password_post: 'Confirm password', // 确认交易密码

        Enter_transaction_password_again: 'Enter transaction password again', // 请再次输入交易密码
        finish: 'Complete', // 完成
        Enter_6_digit_verification: 'Enter 6-digit verification code', // 输入6位验证码
        Inconsistent_passwords_twice: 'Inconsistent passwords twice', // 两次密码不一致

        Successful_operation: 'Successful operation', // 操作成功
        Recover_transaction_password: 'Recover transaction password', // 找回交易密码
        send_late: ' Send', // 后发送
        send_code: 'Send', // 发送验证码

        password: 'Password', // 密码
        enter_password: 'Enter password', // 请输入密码

    },

    //提示语
    toast: {
        loading: 'Loading', // 加载中
        Upload_failed: 'Upload failed, please try again later', //上传失败，请稍后重试
        Uploaded_successfully: 'Uploaded successfully', //上传成功
        Name_required: 'Name is required', //名称不能为空

        Cannot_contain_special_characters: 'Cannot contain special characters', // 名称不能包含特殊字符
        Id_card_required: 'ID number is required', //身份证不能为空
        Enter_ID_number: 'Enter the correct ID number', // 请输入正确的身份证号
        Submitted_successfully: 'Submitted successfully', // 提交成功

    },
    // 邀请好友
    invitation: {
        Rebate_rules: 'Rebate rules', //返佣规则
        Send_invitation_friends: 'Send invitation to friends', //发送邀请给好友
        registration_transactions: 'Friends complete registration and contract transactions', //好友完成注册并进行合约交易
        Get_rebates: 'Get the corresponding proportion of rebates', //获得相应比例返佣

        Generate_poster: 'Generate poster', // 生成海报
        In_person_invitation: 'In-person invitation', // 面对面邀请
        My_nvitation_code: 'My invitation code', // 我的邀请码
        copy: 'Copy', // 复制

        Ranking: 'Ranking', // 排名
        Invitor_account: 'Invitor account', // 邀请人账号
        Get_rebate: 'Get rebate', // 获得返佣金
        User_invited_successfully: 'User invited successfully', // 成功邀请用户

        Registration_time: 'Registration time', // 注册时间
        My_rebates: 'My rebates', // 我的返佣
        Leaderboard: 'Leaderboard', // 排行榜
        rules_title: 'Meta Currency rebate rules explained', // Meta Currency返佣规则说明

        rules1: 'After a friend accepts your invitation to register, the transaction fee will be deducted, and the corresponding commission will be generated.',
        // 好友接受您的邀请进行注册后，交易扣除手续费的同时，会产生相应比例的返佣。
        rules2: "The current rebate ratio is 30%, and the rebate cycle is permanent rebate. When the inviter's rebate reaches 5000USDT, the user can be invited without any rebate. The rebate will be transferred to your contract account after settlement.",
        //当前返佣比例为30%，返佣周期为永久返佣，当邀请人返佣达到5000USDT后，可以在邀请用户，无返佣，返佣结算后会转入您的合约账户。
        rules3: 'Friend trade rebates are counted once per order and settled every day at 0:00. Rebates generated after 0:00 will be deferred to the next settlement point.',
        // 好友交易返佣每单统计一次，每天0：00结算，0：00之后产生的的返佣会顺延到下一个结算点。
        rules4: 'Rebate settlement method: Rebate amount = actual transaction fee * rebate ratio.',
        // 返佣结算方法：返佣额=实际交易手续费*返佣比例。

        rules5: 'Currently, the USDT perpetual contract transaction supports the rebate transaction, that is, the invitee can only get the rebate if the contract transaction is performed.',
        // 目前支持返佣的交易有USDT永续合约交易，即被邀请人只有进行了合约交易才能获得返佣，返佣币种与手续费币种一致。
        rules6: 'The monthly list on the 1st of each month can see the data of the previous month.',
        // 每月1号月度榜单可以看到上月数据。
        copy_fail: 'Copy failed, please try again later', //  复制失败，请稍后重试
        copy_sucess: 'Copy successful', //  复制成功



    },

    // 分享海报
    shareBox: {
        Choose_poster: 'Choose a poster', // 选择海报
        share: 'share to', // 分享到
        save: 'save', // 保存
        select_poster: 'Please select a poster', // 请选择海报

        Poster_generation: 'Poster generation', //海报生成中
        Picture_saved_successfully: 'Picture saved successfully', // 保存图片成功
        Invite_join: 'Invite you to join Meta Currency, long press to identify', // 邀请你加入Meta Currency，长按识别二维码
        Failed_save_picture: 'Failed to save the picture, please try again', // 保存图片失败，请重试

        Poster_generation_failed: 'Poster generation failed, please try again', // 海报生成失败，请重试
    },
    // 账户中心
    accountCenter: {
        title: 'Account center', // 账户中心
        phone: 'Mobile phone', // 手机
        mail: 'E-mail', //邮箱
        login_password: 'Login password', // 登录密码

        Unbound: 'Unbound', // 未绑定
        Bound: 'Bound', // 已绑定
        modify: 'To modify', // 去修改
        log_first: 'Please log in first', // 请先去登录
        googleAuthenticator: 'Google Authenticator' //Google Authenticator
    },

    // 绑定账号
    bind: {
        title1: 'Bind phone', //  
        title2: 'Bind mailbox', // 绑定邮箱
    },
    // 修改密码
    change: {
        old_password: 'Old password', // 原密码
        original_password: 'Enter original password', // 请输入原密码
        new_password: 'New password', // 新密码
        not_pure_numbers: 'Enter 8-20 characters, not pure numbers', // 请输入8 - 20 位字符， 不能是纯数字

        confirm_password: 'Confirm password', // 确认密码
        enter_password_again: 'Enter the password again', // 请再次输入密码
        Inconsistent_passwords_twice: 'Inconsistent passwords twice', // 两次密码不一致
        Modify_successfully: 'Modify successfully, log in again', // 修改成功，重新登录

        change_Password: 'Change password', // 修改密码
        forget_password: 'Forget password', // 忘记密码
        Cannot_withdraw_password: 'Cannot withdraw money within 24 hours after changing password', // 修改密码后， 24 小时内无法提币
        modify: 'modify', // 修改

    },

    // 找回密码
    forget: {
        Retrieve_password: 'Retrieve password', // 找回密码
        finish: 'Complete', // 完成
        new_password: 'New password', // 新密码
        not_pure_numbers: 'Enter 8-20 characters, not pure numbers', // 请输入8 - 20 位字符， 不能是纯数字

        confirm_password: 'Confirm password', // 确认密码
        enter_password_again: 'Enter the password again', // 请再次输入密码
        Inconsistent_passwords_twice: 'Inconsistent passwords twice', // 两次密码不一致
        Modify_successfully: 'Modify successfully, log in again', // 修改成功，重新登录

        change_Password: 'Change password', // 修改密码
        forget_password: 'Forget password', // 忘记密码
        Cannot_withdraw_password: 'Cannot withdraw money within 24 hours after changing password', // 修改密码后， 24 小时内无法提币
        modify: 'modify', // 修改

    },


    // 登录、注册
    login: {
        login: 'Log in', // 登录
        register: 'Register', // 注册
        Hurry_register: "Don't have a Meta Currency account? Hurry up and", // 
        Already_register: 'Already have a Meta Currency account? Hurry up and', // 已经有Meta Currency账号？赶快去

        login_successful: 'login successful', // 登录成功
        enter_invitation_code: 'Enter invitation code(optional)', // 请输入邀请码（ 选填）
        Invitation_code: 'Invitation code', // 邀请码
        Read_and_agree: 'Read and agree', //已阅读并同意
        User_Registration_Agreement: '"User Registration Agreement"', //《 用户注册协议》

    },
    //谷歌验证器
    googleAuthenticator: {
        InstallVerifier: 'Install',
        BindingVerifier: 'Bind', //Bind
        enterVerificationCode: 'Code',
        downloading: 'downloading...', //downloading...
        verifierTip: 'Download and install',
        download: 'Download',
        scanningApp: 'Scanning or input key',
        secretkey: 'secret key',
        pleaseEnter: 'Please enter the 6-bit verification code in Google Verifier for verification',
        closeTip: 'No payment within 24 hours after closing Google second validation',
    },
    //权限
    permissions: {
        remind: 'Remind',
        Noacquisition: 'No',
        Jurisdiction: 'Access to',
        goingtosetup: 'Are you going to setup?',
        setup: 'Set up',
        photos: 'Photos',
    },
    // 用户注册协议
    agreement: {
        User_Registration_Agreement_title: 'User Registration Agreement', // 用户注册协议
        p0: 'I have carefully read the service agreement (hereinafter referred to as "this agreement"). By clicking the "Register" button or by accessing or using the Service, you agree to comply with this agreement and all additional agreements. Before you register as a Meta Currency platform user, you must carefully and carefully read and fully understand the entire content of this agreement, especially the waiver of liability for the Meta Currency platform and the terms that restrict your rights. You click the consent button on the page provided by the Meta Currency platform (for example, the button indicates "Agree to Agreement and Register" or similar text, and the page also lists the content of this agreement or a link that can effectively display the content of this agreement), that is, It means that you have confirmed that you have accepted and signed this agreement after fully reading and understanding the contents of this agreement, and mean that you and our company have reached an agreement and agree to accept all the agreed contents of this agreement, including the rules related to this agreement and Meta Currency All types of statements, rules, and instructions included in the platform that have been issued or will be released in the future (if there is no agreement in the service agreement, the corresponding contents in the various statements, rules, and instructions issued by the Meta Currency platform shall prevail). If you do not agree or do not accept all or part of this agreement, please do not register as a Meta Currency platform user and use the Meta Currency platform services.',
        risk_warning: 'Risk warning', // 风险提示
        risk_warning_1: 'Based on the great risks inherent in digital currency transactions, users should fully understand the characteristics of digital currencies themselves, transaction mechanisms, and price fluctuations before conducting digital transactions on this website. At the same time, due to the regulation and management of digital currency transactions by laws and policies, digital currency transactions may be suspended or banned at any time due to this impact. Digital currency transactions have a greater risk. Transactions or holding digital currency are likely to cause Your loss. Meta Currency will not be held responsible for this. Therefore, you should carefully consider whether to trade digital currencies or related derivatives and use leverage based on your financial situation.',

        risk_warning_2: 'Meta Currency cannot guarantee the orderly stability of the digital currency market. You should be cautious in trading digital currencies (and any other assets). Prices can fluctuate at any time. Due to price fluctuations, you may make a large profit or loss. Any digital currency or trading position may fluctuate significantly and may even become worthless.',
        risk_warning_3: "When using this service, if the user or the user's transaction instruction is wrong (including but not limited to price, quantity and other factors) and the user's transaction is lost, if it is not for the reasons of the trading rules of this site, the user will be responsible for the loss. . Any loss caused by the user's fault shall be borne by the user. The fault includes but is not limited to: not following the transaction prompts, not conducting the transaction operation in a timely manner, forgetting or leaking the password, the password being cracked by others, and the computer used by the user being intruded by others.",
        risk_warning_4: "When using this service, the company has the right to increase the relevant account handling fee if the user takes advantage of website trading rules, potential or unexpected loopholes in the trading system. The company has the right to freeze and make commission adjustments and account clearing for those who have obtained improper profits by maliciously exploiting the system's own loopholes.  The aforementioned vulnerabilities may be potential or sudden. Including but not limited to situations such as the use of platform systems to delay improper profits, computer virus intrusion and other situations.",
        risk_warning_5: 'If the company believes that you violated this agreement based on its unilateral judgment, the company has the right to suspend or terminate your account at any time, or suspend or terminate your use of the services provided by this website or digital asset transactions.',

        risk_warning_6: 'If the user finds that there are substantial loopholes in the trading rules of the website or the trading system, which may affect the security of the transaction, he can contact the back-end technical staff and we will fix it as soon as possible.',
        risk_warning_7: 'When there are unforeseeable, unavoidable, and insurmountable objective situations, including but not limited to floods, earthquakes and other natural disasters, wars, riots, fires, emergency public health events, government expropriation, confiscation, changes in laws and regulations, or other unexpected The occurrence of force majeure factors such as incidents will seriously affect the operation of the Hopex digital asset derivatives trading platform, which may lead to the loss of entrusted funds, resulting in unpredictable and unpreventable risks.',
        User_registration: 'User registration', // 用户注册
        User_registration_1: 'In order to use any service on this platform, you must first register your account by providing your name, email and password, and confirm acceptance of this service agreement. You promise to keep your account information and password properly, and do not allow anyone to use and guide your account to ensure that your account is not stolen. You are responsible for protecting and securing any keys, certificates, passwords, access codes, user IDs or other credentials and login information (collectively, "Passwords") provided to you. If you lose your password, you may not be able to access your account. If any unauthorized use of your password occurs, please notify Meta Currency immediately. Meta Currency will not be held liable for any liability, loss or damage caused by unauthorized use of your password. Since this site is a trading website, login passwords, withdrawal passwords, transaction passwords, and SMS passwords must not use the same password, otherwise there will be security risks and the relevant responsibilities shall be borne by the user.',

        User_registration_2: 'The user has the right to choose whether to become a Meta Currency user. If the user chooses to become a Meta Currency registered user, he can create and modify his own nickname. The naming and use of user names and nicknames shall comply with relevant laws and regulations and comply with network ethics. The username and nickname must not contain any insults, threats, obscenities, abuse, etc. that infringe on the legitimate rights and interests of others.',
        User_registration_3: 'Once the user has successfully registered and becomes a Meta Currency user, he will get the username and password, and be responsible for all activities and events that occur after logging in to the system with this username and password. Or indirect legal liability.',
        User_registration_4: 'If the user password is lost, the original password can be retrieved by the method suggested by Meta Currency. If the user finds any illegal use of the username or other security breach, he should immediately inform Meta Currency.',
        User_rights_and_obligations: 'User rights and obligations', // 用户的权利和义务

        User_rights: 'User rights', // 用户权利
        User_rights_1: 'Users have the right to obtain rewards from Meta Currency after making contributions such as publishing information in accordance with relevant website regulations;',
        User_rights_2: 'Users have the right to modify all the modifiable information in their personal accounts, choose their nicknames and enter introductory text, and decide whether to provide non-required content;',
        User_rights_3: '',


        User_rights_4: '',
        User_rights_5: '',

    }



}