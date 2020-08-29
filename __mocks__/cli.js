module.exports = {
    getConfig() {
        return require('../ijl.config').config
    },
    getNavigationsValue(key) {
        return require('../ijl.config').navigations[key]
    }
}