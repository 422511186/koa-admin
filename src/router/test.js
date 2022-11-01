const Router = require("@koa/router")
const {exec} = require("../utils/mysqlUtils")
const nacos = require('../service/nacosService')
const request = require('../utils/requestUtils')
let {testcode, success} = require("../common/apiResponse");
const {count} = require("../common/serversConstant");
const {sleep} = require("../common/common");

/**
 * 路由前缀
 * @type {module:koa-router}
 */
const router = new Router({
    prefix: '/Test'
})


/**
 * ctx
 * koa框架 单线程执行
 */
router.get('/ctx', async (ctx) => {
    count['THESIS_EDITOR_GATEWAY'] += 1
    await sleep(10000);
    console.log(count['THESIS_EDITOR_GATEWAY'])
    ctx.body = count['THESIS_EDITOR_GATEWAY']
})

/**
 * 测试数据库连接是否正常
 */
router.get('/mysql', async (ctx) => {
    let sql = `select * from user where user_name = ?`
    let {username} = ctx.query
    ctx.body = await exec(sql, [username])
})

/**
 * 测试nacos获取服务实例是否正常
 */
router.get('/nacos/instances', async (ctx) => {
    ctx.body = await nacos.discovery('Thesis-Editor-Authorize', 'DEFAULT_GROUP')
})

/**
 * 测试axios
 */
router.get('/axios', async (ctx) => {
    ctx.body = await request({
        url: 'http://localhost:3000/Test/nacos/instances', method: 'get'
    })
})


module.exports = router
