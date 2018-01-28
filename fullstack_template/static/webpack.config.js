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
    extensions: [".js", ".jsx", ".css"]
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
