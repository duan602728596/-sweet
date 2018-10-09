import path from 'path';
import process from 'process';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

export default {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'immutable',
    'redux-immutable',
    'reselect',
    'react-helmet',
    'react-loadable'
  ],
  entry: {
    app: [path.join(__dirname, 'src/app.js')]
  },
  output: { publicPath: '/' },
  loaders: {
    svg: {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true,
          }
        }
      ]
    }
  },
  rules: [
    {
      test: /dll\.js/,
      use: [{
        loader: 'file-loader',
        options: {
          name: isDevelopment ? '[name].[ext]' : '[hash:5].[ext]',
          outputPath: 'script/'
        }
      }]
    }
  ],
  js: {
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    exclude: /(dll\.js|node_modules)/
  },
  sass: { include: /src/ },
  css: {
    modules: false,
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#f5222d',
      '@layout-body-background': '#fff',
      '@layout-header-background': '@primary-color'
    },
    include: /node_modules[\\/]antd/
  },
  html: [{ template: path.join(__dirname, 'src/index.pug') }]
};
