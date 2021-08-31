<template>
<div>
    <i ref="btn"></i>
</div>
</template>

<script>
export default {
    //   接受父组件传递的值，用来控制图形验证的加载
    props: ["isGeet"],
    methods: {
        GtCaptcha() {
            let status = "";
            let randomCode = new Date().getTime();
            this.$post(`data/sms/geetestCode?randomCode=${randomCode}&clientType=h5`).then(res => {
                // 极验第一次，请求回来的参数
                let handler = (captchaObj) => {
                    //   图形验证成功
                    captchaObj.onSuccess(() => {
                        let result = captchaObj.getValidate();
                        let param = {
                            status: status,
                            randomCode: randomCode,
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode,
                        };
                        // 极验校验的参数，将其传给服务端，进行校验。
                        this.$emit("geetPath", param);
                    }).onError(() => {
                        //   图形验证失败
                    });
                    //   为此页面的虚拟按钮添加点击事件
                    this.$refs.btn.addEventListener("click", () => {
                        // 极验图片触发之后，修改控制变量额布尔值，实现再次触发
                        this.$emit("clickChange", false);
                        captchaObj.verify();
                    });
                };
                status = res.result.status;
                //   初始化极验
                this.$initGeet({
                    gt: res.result.gt,
                    challenge: res.result.challenge,
                    offline: !res.result.success, // 表示用户后台检测极验服务器是否宕机
                    new_captcha: res.result.new_captcha,

                    product: "bind", // 产品形式，包括：float，popup
                    width: "300px",
                    https: true
                }, handler);
            });
        }
    },
    created() {
        // 页面创建，调用函数
        this.GtCaptcha();
    },
    watch: {
        // 监听参数的变化，调用极验
        isGeet(val) {
            //   这里通过按钮事件调用极验
            // console.log(6666,this.isGeet)
            this.$refs.btn.click();
        }
    }
};
</script>
