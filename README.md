webpack4 + jquery + babel + bootstrap + css + less + scss + stylus + postcss


```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');



module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  entry: {
    index:"./src/index.js"
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve:{
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
          "sass-loader"
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname,'dist'),
    host:"localhost",
    port:8080,
    open: true,
    publicPath: "/"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({
      chunks:['index','common','vendor'],
      filename:"index.html",
      template:"public/index.html",
      hash:true
    }),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename:"[name].css",
      chunkFilename: "[id].css"
    })
  ]

};
```