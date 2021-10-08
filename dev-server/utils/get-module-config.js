const path = require("path");

module.exports = () => {
    const packagepath = path.resolve('khwar.config.js');
    return require(packagepath);
};
