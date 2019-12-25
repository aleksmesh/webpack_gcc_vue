const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ClosurePlugin = require('closure-webpack-plugin');

var config = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin()
  ],
};

module.exports = ( env, argv ) => {
  if ( 'production' === argv.mode ) {
    config.optimization = {
      minimize: true,
      minimizer: [
        new ClosurePlugin(
          {
            mode: 'STANDARD',
            platform: 'java'
          },
          {
            externs: [ path.resolve(__dirname, 'src', 'vue.ext.js') ],
            compilation_level: 'ADVANCED',
            language_in: 'ECMASCRIPT6',
            language_out: 'ECMASCRIPT6'
          })
      ],
    };
  }
  else {
    config.optimization = {
      minimize: false,
    };
  }
  return config;
};
