const Koa = require('koa')
const parser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const nacos = require('./service/nacosService')
const Test = require('./router/test')
const userRouter = require('./router/userRouter')

const app = new Koa()

/**
 * 服务注册到nacos
 */
// nacos.register();

/**
 * 服务端口
 * @type {number}
 */
const port = 3000

/**
 * 注册请求体解析
 */
app.use(parser())

/**
 * 请求日志
 */
app.use(async (ctx, next) => {
    let start_time = new Date()
    let params = {
        start_time: start_time.toLocaleString(),
        query: ctx.query,
        body: ctx.request.body,
        method: ctx.request.method,
        url: ctx.request.url,
    }
    await next()
    params['elapsed_time'] = `${new Date() - start_time}ms`
    params['resBody'] = ctx.body
    console.log(`request:${JSON.stringify(params)}`)
})


/**
 * 使用koa-json-error中间件进行异常处理
 */
app.use(error({
    /**
     * development环境下返回错误栈stack，production环境下不返回错误栈stack
     */
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))

/**
 * 使用koa-parameter中间件校验参数格式是否正确
 */
app.use(parameter(app)) /* app参数使koa-parameter可以全局使用 */

/**
 * 配置http请求路由
 */
app.use(Test.routes())
app.use(userRouter.routes())


/**
 * 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,
 * 所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
 */
app.use(userRouter.allowedMethods())

/**
 * 启动服务
 */
app.listen(port, () => {
    console.log(`koa-admin server running at http://127.0.0.1:${port}`)
})
