const apiResponse = require("../common/apiResponse")
const userService = require("../service/userService")

class UserController {
    /**
     * 更新用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async update(ctx) {
        // 校验请求体body中的参数
        ctx.verifyParams({
            nick_name: {type: 'string', required: true},
            sex: {type: 'number', required: true},
            email: {type: 'string', required: true},
            phone_number: {type: 'string', required: true},
            status: {type: 'string', required: true},
        })

        let {username} = ctx.params
        await userService.update(username, ctx.request.body)
        ctx.body = apiResponse.success()
    }
}

module.exports = new UserController
