const Router = require("@koa/router")
const userController = require("../controller/userController")

/**
 * 路由前缀
 * @type {module:koa-router}
 */
const router = new Router({
    prefix: '/user'
})

/**
 * 更新用户信息
 */
router.put("/update/:username", userController.update)

module.exports = router
