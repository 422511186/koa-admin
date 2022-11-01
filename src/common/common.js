/**
 * 主线程休眠
 * @param time 休眠时间  单位ms
 * @returns {Promise<unknown>}
 */
async function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}

module.exports = {
    sleep
}
