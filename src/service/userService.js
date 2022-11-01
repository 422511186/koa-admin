const {exec} = require("../utils/mysqlUtils")

class UserService {
    async update(userName, body) {
        let params = []
        let sql = `update user set  `
        for (let bodyKey in body) {
            sql += `${bodyKey} = ?,`
            params.push(body[bodyKey])
        }
        sql = sql.substr(0, sql.length - 1)
        sql += ` where user_name = ?`
        params.push(userName)
        await exec(sql, params)
    }
}

module.exports = new UserService()
