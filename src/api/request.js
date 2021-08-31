import axios from '../axios';
import Qs from 'qs'
export function Get(url, params) {
    return axios.get(url, {
        params
    });
    // return new Promise(function (resolve, reject) {
    //     // 提交JSON数据
    //     api.ajax({
    //         url: baseUrl + url,
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'token':window.localStorage.getItem('token'),
    //             'userId':window.localStorage.getItem('userId')
    //         },
    //         data: {
    //             body: params
    //         }
    //     }, function (ret, err) {
    //         if (ret) {
    //             resolve(ret)
    //         } else {
    //             reject(err)
    //         }
    //     });
    // });
}



//post  穿对象
export function Post(url, params) {
    return axios.post(url, params);
    // return new Promise(function (resolve, reject) {
    //     // 提交JSON数据
    //     api.ajax({
    //         url: baseUrl + url,
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'token':window.localStorage.getItem('token'),
    //             'userId':window.localStorage.getItem('userId')
    //         },
    //         data: {
    //             body: params
    //         }
    //     }, function (ret, err) {
    //         if (ret) {
    //             resolve(ret)
    //         } else {
    //             reject(err)
    //         }
    //     });
    // });
}

//     instance.defaults.headers = {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }

export function Post1(url, params, data) {
    let qs = Qs.stringify(params);
    url = url + '?' + qs
    return axios.post(url, data);
    // return new Promise(function (resolve, reject) {
    //     api.ajax({
    //         url: baseUrl + url,
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'token':window.localStorage.getItem('token'),
    //             'userId':window.localStorage.getItem('userId')
    //         },
    //         // data: {
    //         //     value: params
    //         // }
    //     }, function (ret, err) {
    //         if (ret) {
    //             resolve(ret)
    //         } else {
    //             reject(err)
    //         }
    //     });
    // });

}
export function Post2(url, data) {
    return axios.post(url, data);
}
export function Post3(url, data) {
    return axios.post(url, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" //改这里就好了
        },
    });
}