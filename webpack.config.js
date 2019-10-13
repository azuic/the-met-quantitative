const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    mode: 'development',
    entry:{
        // app: './src/index.js',
        // print: './src/print.js',
        index: './src/index.js',
        // another: './src/another-module.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
    ],
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/',
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    /*
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },

     */
};