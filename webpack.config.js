require('babel-core/register');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const firebaseConfig = require('firebase-tools/lib/config').load({ cwd: process.cwd() })

const src  = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'public');

module.exports = () => ({
    entry: `${src}/index.js`,

    output: {
        path: dist,
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.vue$/, loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules(?!(\/|\\)keen-ui)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'url-loader',
            }
        ],
    },

    devtool: (process.env.NODE_ENV === 'production') ? false : 'inline-source-map',

    resolve: {
        extensions: ['.js'],
    },

    devServer: {
        contentBase: 'public',
        port: 3000,
        historyApiFallback: true,
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),

    ],
});
