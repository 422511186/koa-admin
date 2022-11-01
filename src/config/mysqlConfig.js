const mysql = require("mysql");

/**
 * mysql的连接属性配置
 *
 * @type {Pool}
 */
const mysqlConfig = mysql.createPool({
    host: 'rm-bp11d2ea61e279842oo.mysql.rds.aliyuncs.com',
    user: '',
    password: '',
    database: '',
    port: 3306,
})

module.exports = mysqlConfig
