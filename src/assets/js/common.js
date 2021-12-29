import router from './../../router'
import store from './../../store/index'
import {
    Dialog,
    Toast
} from 'vant';
import Vue from 'vue'
const util = {}
    // 本地或者session存取数据
util.setSession = function(key, obj) {
        window.sessionStorage.setItem(key, JSON.stringify(obj))
    } // 设置session
util.getSession = function(key) {

        return JSON.parse(sessionStorage.getItem(key))
    } // 获取session
util.removeSession = function(key) {
        window.sessionStorage.removeItem(key)
    } // 删除session
util.setLocal = function(key, obj) {
        window.localStorage.setItem(key, JSON.stringify(obj))
    } // 设置本地数据
util.getLocal = function(key) {
        return JSON.parse(window.localStorage.getItem(key))
    } // 获取本地数据
util.removeLocal = function(key) {
        window.localStorage.removeLocal(key)
    } // 清除本地数据
util.scientificNotationToString = function(param) {
        let strParam = String(param)
        let flag = /e/.test(strParam)
        if (!flag) return param

        // 指数符号 true: 正，false: 负
        let sysbol = true
        if (/e-/.test(strParam)) {
            sysbol = false
        }
        // 指数
        let index = Number(strParam.match(/\d+$/)[0])
            // 基数
            // eslint-disable-next-line no-useless-escape
        let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')
        if (sysbol) {
            return basis.padEnd(index + 1, 0)
        } else {
            return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
        }
    } // 科学计数法转换str

util.backRouter = function(backRouter) {
    router.push({
        name: backRouter
    })
}

// 手机号正则


// util.testPhone = function (phone) {
//     if (/^1[3456789]\d{9}$/.test(phone)) {

//         return false;
//     } else {
//         return true
//     }
// }



//保留小数掉后2位
util.toFixed2 = function(value) {
    if (!value) return 0.00
    if (value == '_') return 0.00
    if (value == '-') return 0.00
    if (value == 0) return 0.00
    return Number(value).toFixed(2)
}



// 邮箱正则

util.testEmail = function(em) {
    if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(em)) {
        return false;
    } else {
        return true
    }
}


// 登录密码正则  8-20位非纯数字开头

// util.testLoginPassword = function (pas) {
//     let str = pas.trim();

//     if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(str)) {
//         return false
//     } else {
//         return true
//     }
// }

// 6位纯数字 验证码

util.testCode = function(pas) {
    let str = pas.trim();

    if (/^\d{6}$/.test(str)) {
        return false
    } else {
        return true
    }
}

// 6位纯数字 交易密码

util.testPostPassword = function(pas) {
    let str = pas.trim();
    if (/^\d{6}$/.test(str)) {
        return false
    } else {
        return true
    }
}

// 大小写转换
util.toU = function(val) {
    // console.log(val)
    if (val == undefined || val == null || val == '') {

    } else {
        return val.toUpperCase()

    }
}

util.toL = function(val) {
        return val.toLowerCase()
    }
    //判断是否有权限
util.confirmPer = function(perm, name) {
        var has = api.hasPermission({
            list: [perm]
        });
        // if (!has || !has[0] || !has[0].granted) {
        //     //    api.confirm({
        //     //         title: '提醒',
        //     //         msg: '没有获得' + name + '权限,是否前往设置？',
        //     //         buttons: [去设置, 存储]
        //     //     }, function (ret, err) {
        //     //         if (1 == ret.buttonIndex) {
        //     //             util.reqPermission(perm);
        //     //         }
        //     //     });
        //     Dialog.confirm({
        //         title: '提醒',
        //         message: '没有获得' + name + '权限,是否前往设置？',
        //     }).then(() => {
        //         util.reqPermission(perm);
        //     }).catch(() => {
        //
        //     });
        //     return false;
        //  }
        return true;
    }
    //设置权限
util.reqPermission = function(one_per, callback) {
    var perms = one_per;
    api.requestPermission({
        list: [perms],
        code: 100001
    }, function(ret, err) {
        if (callback) {
            callback(ret);
            return;
        }
    });
}
util.showLoading = function(title) {
    Toast.loading({
        message: title || "Loading...",
        forbidClick: true,
        duration: 0
    });
}

// 字符串截取小数点后N位
util.SubString = function(value, num) {
        if (num == -1) {
            return value;
        }
        if (!value || value === 0) {
            return 0
        } else {

            let s = value + ''
                // if (s.indexOf('.') !== -1) {
                //     return s.substring(0, s.indexOf('.') + 1 + num)
                // } else {
                //     return s
                // }
            if (s.indexOf('.') !== -1) {
                if (num == 0) {
                    return s.substring(0, s.indexOf('.'))
                }
                return s.substring(0, s.indexOf('.') + 1 + num)
            } else {
                return s
            }
        }
    }
    // 未登录提示
util.isLogin = function() {
    if (!store.state.isLogin) {
        Dialog.confirm({
            title: '',
            message: window.vm.$t('common0.drts'),
            confirmButtonText: window.vm.$t('common0.qd'),
            cancelButtonText: window.vm.$t('common0.qx'),
        }).then(() => {
            router.push('/login');
        }).catch(() => {

        });
        return false;
        // MessageBox.confirm('内容', '标题'), {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }.then(() => {
        //     router.push('/login');
        // })
    }
    return true;
}
util.isNickname = function(that, isset = false) {
    // console.log(isset)
    if (isset) {
        return true;
    }
    Dialog.confirm({
        title: '',
        message: '当前未设置昵称，去设置？'
    }).then(() => {
        that.$hub.$emit("showReName");
    }).catch(() => {

    });
    return false;
}
util.isRenZhengs = function(that, isset = false) {
        if (isset) {
            return true;
        }
        Dialog.confirm({
            title: '',
            message: '当前未实名认证，去认证？'
        }).then(() => {

            router.push('/personalCenter');
        }).catch(() => {

        });
        return false;
    }
    //保存图片
util.savePicture = function(url) {
        if (util.confirmPer('photos', '存储')) {
            var timestamp = new Date().getTime();
            util.showLoading();
            api.download({
                url: url,
                savePath: 'fs://qulian.jpeg?' + timestamp,
                report: true,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                if (ret.state == 1) {
                    Toast.clear();
                    api.saveMediaToAlbum({
                        path: 'fs://qulian.jpeg?' + timestamp
                    }, function(ret, err) {
                        if (ret && ret.status) {
                            Toast('图片保存成功');
                        } else {
                            Toast('图片保存失败');
                        }
                    });
                } else {
                    Toast.clear();
                }
            });
        }

    }
    //将科学计数法转换
util.toNumber = function(num, n = -1) {

    //处理非数字
    if (isNaN(num)) {
        return num
    };
    //处理不需要转换的数字
    var str = '' + num;
    if (!/e/i.test(str)) {
        return util.SubString(parseFloat(num), n);
    };
    return util.SubString((num).toFixed(18).replace(/\.?0+$/, ""), n);
    // if (!/e/i.test(str)) { return num; };


    // return (num).toFixed(18).replace(/\.?0+$/, "");
}

//压缩base64
util.dealImage = function(base64, w, callback) {
        var newImage = new Image();
        var quality = 0.6; //压缩系数0-1之间
        newImage.src = base64;
        newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要
        var imgWidth, imgHeight;
        newImage.onload = function() {
            imgWidth = this.width;
            imgHeight = this.height;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                    canvas.width = w;
                    canvas.height = w * imgHeight / imgWidth;
                } else {
                    canvas.height = w;
                    canvas.width = w * imgWidth / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 0.6;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
            // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
            // while (base64.length / 1024 > 150) {
            // 	quality -= 0.01;
            // 	base64 = canvas.toDataURL("image/jpeg", quality);
            // }
            // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
            // while (base64.length / 1024 < 50) {
            // 	quality += 0.001;
            // 	base64 = canvas.toDataURL("image/jpeg", quality);
            // }
            callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
        }
    }
    //将base64转成文件流
util.base64toFile = function(dataurl, filename = "file") {
    let arr = dataurl.split(",");

    let mime = arr[0].match(/:(.*?);/)[1];

    let suffix = mime.split("/")[1];

    let bstr = atob(arr[1]);

    let n = bstr.length;

    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    });
}
util.IsIA = function() {
    if (/android/gi.test(navigator.appVersion)) {
        return 1;
    } else if (
        navigator.userAgent.indexOf("iPhone") != -1 ||
        navigator.userAgent.indexOf("iPod") != -1 ||
        navigator.userAgent.indexOf("iPad") != -1
    ) {
        return 2;
    }
}

export default util