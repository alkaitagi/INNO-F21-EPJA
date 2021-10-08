const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        publicPath: `/static/dummy/1.0.0/`
    },
    resolve: {
        extensions: ['.mjs', '.tsx', '.js', '.jsx', '.ts', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{ loader: 'file-loader' }]
            },
            {
                test: /\.(m?js|ts)x?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "static", to: "static", noErrorOnMissing: true },
                { from: "locales", to: "locales", noErrorOnMissing: true }
            ],
        }),
    ],
};
