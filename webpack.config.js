module.exports = {
    //define entry point
    entry: './src/main.js',

    //define output point
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },

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
