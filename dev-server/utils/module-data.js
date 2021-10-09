const path = require('path')

module.exports = () => {
    const package = require(path.resolve('package.json'))
    return {
        version: package.version,
        entryPoint: package.main,
        name: package.name.replace(/^@.*\//, ""),
    }
}
