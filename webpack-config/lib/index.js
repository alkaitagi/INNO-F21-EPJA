const config = require("../webpack.config");

const prodConfig = {
    mode: "production",
    entry: process.env.ENTRY,
    ...config,
}
const devConfig = {
    mode: "development",
    entry: process.env.ENTRY,
    devtool: 'eval-cheap-module-source-map',
    ...config,
}

if (process.env.NODE_ENV === 'production') {
    module.exports = prodConfig;
} else {
    module.exports = devConfig;
}
