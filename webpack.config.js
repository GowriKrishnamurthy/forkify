const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack has are four core concepts:  entry point, output, loaders, and plugins.

module.exports = {
    // entry point is where webpack will start the bundling.
    entry: ['babel-polyfill', './src/js/index.js'],
    
    // output: where to save this bundle file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        // web pack will serve the final code from this dist folder
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
