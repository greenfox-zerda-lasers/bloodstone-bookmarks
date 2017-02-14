var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    //define entry point
    entry: './src/main.js',

    //define output point
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    // copy files to dist
    plugins: [
    new CopyWebpackPlugin([
      {
        context: './src/login',
        from: '*.html',
        to: './views',
      },
      {
        context: './src/home',
        from: '*.html',
        to: './views',
      },
      {
        context: './src/register',
        from: '*.html',
        to: './views',
      },
    ]),
  ],

    module: {
      loaders: [


          {
              test: /\.scss$/,
              loader: 'style-loader!css-loader!sass-loader'
          }
      ]
    },

    resolve: {
      extensions: ['', '.js']
    },

};
