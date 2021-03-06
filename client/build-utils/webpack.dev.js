const commonPaths = require('./common-paths');
const webpack = require('webpack');
const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  entry: {
    app: `${commonPaths.appEntry}/index.js`
  },

  output: {
    filename: '[name].[hash].js'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              /* modules: true, */
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: {
      "/auth/google": { target: 'http://localhost:5000' },
      "/auth/facebook": { target: 'http://localhost:5000' },
      "/auth/twitter": { target: 'http://localhost:5000' },
      "/auth/github": { target: 'http://localhost:5000' },
      "/api/register": { target: 'http://localhost:5000' },
      "/api/login": { target: 'http://localhost:5000' },
      "/api/*": { target: 'http://localhost:5000' }
    }
  }
};

module.exports = config;