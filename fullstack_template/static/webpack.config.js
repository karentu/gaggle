var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    index: __dirname + '/js/index.jsx',
    home: __dirname + "/js/home.jsx"
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['.'] }
    })
  ],
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
      ]
  }
};
