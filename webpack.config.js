const path = require('path');
module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './javascript/circular dependency/index'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: [/\.tsx$/, /\.ts$/],
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'index.js',
  },
};
