const path = require('path');


module.exports = {
    context: __dirname,
    entry: "./js/sketch.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
              test: [/\.js$/],
              exclude: [/node_modules/],
              loader: 'babel-loader',
              options: { presets: ['es2015'] }
            }
        ]
    }
}
