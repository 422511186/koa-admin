const mysqlConfig = require('../config/mysqlConfig')


const execute = (sql, values) => {
    return new Promise((resolve, reject) => {
        mysqlConfig.getConnection((err, conn) => {
            if (err) reject(err)
            else conn.query(sql, values, (err, res) => {
                if (err) reject(err)
                else resolve(res)
                conn.release()
            })

        })
    })
}

/**
 * 执行sql语句
 *
 * @param sql   sql语句   -- 预加载sql 占位符: ?
 * @param values    sql中占位符参数
 * @returns {Promise<unknown>}
 */
async function exec(sql, values) {
    return await execute(sql, values)
}

module.exports = {
    exec
}
