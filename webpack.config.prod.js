const path = require('path')
const Dotenv = require('dotenv-webpack')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: process.env.IS_ANALYZE ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    globalObject: 'self'
  },
  devtool: process.env.IS_ANALYZE ? 'source-map' : 'none',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      spec: path.resolve(__dirname, 'spec'),
      storybook: path.resolve(__dirname, 'storybook')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true,
      safe: path.resolve(__dirname, '.env.example')
    }),
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Jobsity Calendar',
      description: 'Jobsity Calendar',
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      isCypress: !!process.env.IS_CYPRESS,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      },
      loadingIcon: `<img id="loading" alt="loading" src="/images/logo.svg" />`,
      appleTouchIcon: `<link rel="apple-touch-icon" href="/images/logo_192.png" />`,
      manifest: `<link rel="manifest" href="/manifest.json" />`,
      preload: `<style>${fs.readFileSync(
        path.resolve(__dirname, 'public/preload.css'),
        'utf-8'
      )}</style>`
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/logo.svg'),
          to: 'images'
        },
        {
          from: path.resolve(__dirname, 'public/robots.txt')
        },
        {
          from: path.resolve(__dirname, 'public/manifest.json')
        },
        {
          from: path.resolve(__dirname, 'public/images'),
          to: 'images'
        },
        {
          from: path.resolve(__dirname, 'public/_redirects')
        }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true
          },
          output: { comments: false }
        }
      })
    ],
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
