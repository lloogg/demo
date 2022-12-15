const path = require('path');
module.exports = {
  mode: 'development',

  entry: {
    astar: path.resolve(__dirname, './path-finding/astar2'),
    jps: path.resolve(__dirname, './path-finding/jps'),
    test: path.resolve(__dirname, './path-finding/test'),
    test2: path.resolve(__dirname, './path-finding/test2'),
    hightower: path.resolve(__dirname, './routing/hightower'),
    hightower2: path.resolve(__dirname, './routing/hightower2'),
    hightower3: path.resolve(__dirname, './routing/hightower3'),
    'react-router-lazy': path.resolve(__dirname, './react-router-lazy/main'),
  },
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
    filename: '[name].js',
  },
};
