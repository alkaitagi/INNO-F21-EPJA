const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const applyHbs = require("@khwar1/templates");
const getModuleData = require("./utils/module-data");
const getModuleConfig = require('./utils/get-module-config')

const app = express();
const baseUrl = "/static";

const startServer = ({ port }) => {
    const moduleData = getModuleData();
    const appPath = `/${moduleData.name}`;
    applyHbs(app);

    const compiler = webpack({
        mode: "development",
        entry: moduleData.entryPoint,
        output: {
            filename: "index.js",
            path: path.resolve("dist"),
            libraryTarget: "umd",
            publicPath: `/static/${moduleData.name}/1.0.0/`,
        },
        resolve: {
            extensions: [".tsx", ".js", ".jsx", ".ts", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                },
            ],
        },
    });

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: `/static/${moduleData.name}/1.0.0/`,
        })
    );

    const config = getModuleConfig();

    app.get(appPath, (_req, res) => {
        res.render("index", {
            baseUrl: "/static",
            fireAppVersion: "1.0.0",
            title: "khwar1",
            apps: JSON.stringify({
                ...(config.app || {}),
                [moduleData.name]: {
                    version: "1.0.0",
                },
            }),
            navigations: JSON.stringify({
                ...(config.navigations || {}),
                [moduleData.name]: appPath,
                "dummy.login": "dummy/login",
            }),
            config: JSON.stringify({ ...(config.config || {}) }),
            features: JSON.stringify({ ...(config.features || {}) }),
        });
    });

    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}${appPath}`);
    });

    app.use(
        baseUrl,
        express
            .Router()
            .get(
                /\/([._-\w]+)\/([\w\d._-]+)\/(.*)/,
                require("./utils/get-module")
            )
    );
};

module.exports = startServer;
