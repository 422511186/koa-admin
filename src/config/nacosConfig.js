/**
 * nacos的配置
 * @type {{server: {namespace: string, list: string, group: string}, service: {port: number, ip: string, name: string}}}
 */
let config = {
    server: {
        list: 'localhost:8848',
        namespace: '0b24d80b-ab7e-4d7d-a5dc-50da8c3fd24c',
        group: "DEFAULT_GROUP"
    },

    service: {
        /**
         * 服务名称
         */
        name: 'koa-admin',
        ip: 'localhost',
        port: 3000
    }
}

module.exports = {
    config: config
}


