const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  ...require('./webpack.config.prod'),
  mode: 'development',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true,
      safe: path.resolve(__dirname, '.env.example')
    })
  ],
  optimization: {}
}
