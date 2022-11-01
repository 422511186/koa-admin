const NacosNamingClient = require('nacos').NacosNamingClient
const {config} = require('../config/nacosConfig')

const logger = console
//服务名称
const serviceName = config.service.name

/**
 * nacos客户端 配置
 *
 * @returns {NacosNamingClient}
 */
function nacos() {
    return new NacosNamingClient({
        logger,
        serverList: config.server.list,
        namespace: config.server.namespace,
    })
}

/**
 * 服务实例注册到nacos
 *
 * @returns {Promise<void>}
 */
async function register() {
    const client = nacos()
    await client.ready()
    await client.registerInstance(serviceName, {
        ip: config.service.ip,
        port: config.service.port,
    }, config.server.group)
}

/**
 * 服务发现
 *
 * @param service   服务名称
 * @param group 分组
 * @returns {Promise<string[]>} 返回值
 */
async function discovery(service = serviceName, group = config.server.group) {
    const client = nacos()

    await client.ready()
    const instances = await client.getAllInstances(service, group)

    const [instance] = instances.filter(item => {
        return item['healthy']
    })
    let address = []
    instances.forEach(instance => {
        address.push(`${instance['ip']}:${instance['port']}`)
    })
    console.log(`service:${service},address:${JSON.stringify(address)}`)
    return instances
}


module.exports = {register, discovery}
