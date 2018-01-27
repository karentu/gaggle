module.exports = {
  entry: __dirname + "/js/index.jsx",
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
