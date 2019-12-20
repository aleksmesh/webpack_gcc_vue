//const VueLoaderPlugin = require('vue-loader/lib/plugin')
//const VueLoaderPlugin = require('vue-template-compiler')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
  mode: 'production',
//  resolve: {
//    alias: {
//      vue$: 'vue/dist/vue.js'
//    }
//  },
  optimization: {
    minimize: true,
    minimizer: [
      new ClosurePlugin({
//        mode: 'STANDARD',
        mode: 'STANDARD',
//        childCompilations: true
        },
        {
          externs: [ path.resolve(__dirname, 'src', 'vue.ext.js') ],
          compilation_level: 'ADVANCED',
//          create_source_map: './output.js.map',
//          languageIn: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5'
        })
    ],
  },
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
    new VueLoaderPlugin(),
  ],
};
