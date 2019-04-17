const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
  const context = path.resolve(__dirname, '.');
  const isDevBuild = (env || 'development') != 'production';

  console.log('Building for \x1b[33m%s\x1b[0m', env);
  console.log('Is developemnt build: ', isDevBuild);
  console.log('Context: ', context);

  var cfg = {
    mode: isDevBuild ? 'development' : 'production',
    context: context,
    entry: {
      'main': './ClientApp/main.ts',
      'styles': './ClientApp/styles.scss'
    },

    output: {
      path: path.resolve(__dirname, './wwwroot/dist'),
      publicPath: '/dist/',
      filename: './app/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            }
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {
                      'browsers': ['Chrome >= 50', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']
                    }
                  }
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
      },
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: isDevBuild ? '"development"' : '"production"'
          }
        })),
      new MiniCssExtractPlugin({
        filename: './app/[name].css'
      })
    ].concat(
      isDevBuild
        ? []
        : [
          new webpack.LoaderOptionsPlugin({
            minimize: true
          })
        ]
    ).concat([
        new CleanWebpackPlugin(['./wwwroot/dist'])
    ]),
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },

    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: isDevBuild ? '#eval-source-map' : '#source-map',
    optimization: {
      minimizer: [].concat(isDevBuild
        ? []
        : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true
            },
            sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
        ])
    },
    node: {
      fs: 'empty'
    }
  }

  return cfg;
}

