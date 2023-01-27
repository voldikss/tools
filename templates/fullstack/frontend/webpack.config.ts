import 'webpack-dev-server'

import HTMLWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: './src/main.tsx',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    host: '0.0.0.0',
    port: '9000',
    liveReload: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    // devMiddleware: {
    //   writeToDisk: true
    // }
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.html?$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['src', 'node_modules'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],
}

export default config
