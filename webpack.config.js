module.exports = {
    //define entry point
    entry: './client/src/main.js',

    //define output point
    output: {
        path: 'dist/client',
        filename: 'bundle.js'
    },

     module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ] //loaders
    } //module

};
