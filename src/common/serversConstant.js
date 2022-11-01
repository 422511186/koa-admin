/**
 * 服务名称
 * @type {string}
 */
const THESIS_EDITOR_ARCHIVE = "Thesis-Editor-Archive"
const THESIS_EDITOR_AUTHORIZE = "Thesis-Editor-Authorize"
const THESIS_EDITOR_USER = "Thesis-Editor-User"
const THESIS_EDITOR_GATEWAY = "Thesis-Editor-Gateway"
const THESIS_EDITOR_CVV = "Thesis-Editor-CVV"

/**
 * 计算调用次数, 用于负载均衡算法
 * @type {{THESIS_EDITOR_GATEWAY: number, THESIS_EDITOR_ARCHIVE: number, THESIS_EDITOR_AUTHORIZE: number, THESIS_EDITOR_USER: number, THESIS_EDITOR_CVV: number}}
 */
const count = {
    THESIS_EDITOR_GATEWAY: 0,
    THESIS_EDITOR_ARCHIVE: 0,
    THESIS_EDITOR_AUTHORIZE: 0,
    THESIS_EDITOR_USER: 0,
    THESIS_EDITOR_CVV: 0,
}

module.exports = {
    servers: [THESIS_EDITOR_GATEWAY, THESIS_EDITOR_ARCHIVE, THESIS_EDITOR_AUTHORIZE, THESIS_EDITOR_USER, THESIS_EDITOR_CVV,],
    count
}
