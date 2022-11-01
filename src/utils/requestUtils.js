const request = require('axios');

/**
 * axios 配置
 * @type {string}
 */
request.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 相应拦截器
 */
request.interceptors.response.use(res => res.data, error => {
    let {message} = error;
    if (message === "Network Error") {
        message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    console.log(`message:${message}`)
    return Promise.reject(error)
})
module.exports = request
