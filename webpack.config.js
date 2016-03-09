module.exports = {
  entry:  './js/',
  output: {
    path:     'js',
    filename: 'nullchan.js',
  },

  module: {
    loaders: [
      {
        test:   /\.jsx/,
        loader: 'babel',
      }
    ]
  }
}
