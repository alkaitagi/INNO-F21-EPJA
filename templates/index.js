const hbs = require("express-hbs");

module.exports = function (app) {
    app.engine("hbs", hbs.express4({}));
    app.set("view engine", "hbs");
    app.set("views", __dirname + "/views");
};
