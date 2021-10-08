const webpack = require('webpack');
const config = require('@khwar1/webpack-config');
const getModuleData = require('@khwar1/dev-server/utils/module-data');

module.exports = ({ prod }) => {
    process.env.NODE_ENV = prod ? 'production' : 'development'
    process.env.ENTRY = getModuleData().entryPoint
    webpack(config);
}
