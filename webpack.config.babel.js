import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const getConfiguration = () => {

  const clientConfiguration = {

    entry: {
      bundle: 'source/client/application/components/application.jsx',
      vendor: ['react', 'whatwg-fetch', 'react-dom', 'redux', 'react-redux', 'redux-promise']
    },

    output: {
      path: path.join(__dirname, 'build', 'client'),
      filename: '[name].[chunkhash].js',
      pathinfo: true
    },

    devtool: 'eval',

    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.jsx', '.css', '.scss'],
      alias: {
        'Header': 'source/client/application/components/header',
        'Content': 'source/client/application/components/content',
        'Character': 'source/client/application/components/character',
        'Footer': 'source/client/application/components/footer',
        'CreateAction': 'source/client/application/actions/create.characters.action',
        'ReadAction': 'source/client/application/actions/read.characters.action',
        'UpdateAction': 'source/client/application/actions/update.characters.action',
        'DeleteAction': 'source/client/application/actions/delete.characters.action',
        'Reducers': 'source/client/application/reducers',
        'CharactersReducer': 'source/client/application/reducers/characters.reducer',
        'AvatarImage': 'source/client/images/avatar.jpg',
        'GeneralStyle': 'source/client/styles/general.scss',
        'LayoutStyle': 'source/client/styles/layout.scss',
        'ResponsiveStyle': 'source/client/styles/responsive.scss',
        'VariablesPartial': 'source/client/styles/partials/_variables',
        'FlexLayoutMixin': 'source/client/styles/mixins/flex-layout',
        'CardLayoutMixin': 'source/client/styles/mixins/card-layout'
      }
    },

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /(build|node_modules)/
        },
        {
          loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
          test: /\.s?css/
        },
        {
          loader: 'file-loader?name=[name].[hash].[ext]',
          test: /\.(woff2)$/
        },
        {
          test: /\.(jpe?g|png|gif|svg)/,
          use: [
            {
              loader: 'url-loader', options: {
                limit: 4096
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
      new ExtractTextPlugin('bundle.[contenthash].css'),
      new HtmlWebpackPlugin({ template: 'source/client/application/index.html' }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    ]
  }

  var nodeModules = {}
  fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod
    })

  const serverConfiguration = {
    entry: {
      server: path.join(__dirname, 'server.js')
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /(build|node_modules)/
        }
      ]
    },
    target: 'node',
    output: {
      path: path.join(__dirname, 'build', 'server'),
      filename: '[name].js',
    },
    externals: nodeModules
  }

  return [clientConfiguration, serverConfiguration]
}

module.exports = getConfiguration
