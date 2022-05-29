const path = require('path');
module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './path-finding/astar2'),
  // entry: path.resolve(__dirname, './graph/index'),
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
