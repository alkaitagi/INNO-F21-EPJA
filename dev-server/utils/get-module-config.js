const path = require("path");

module.exports = () => {
    const packagepath = path.resolve('khwar1.config.js');
    return require(packagepath);
};
