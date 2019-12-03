/* 插件配置 */
import * as path from 'path';
import { ParsedPath } from 'path';
import * as webpack from 'webpack';
import * as Config from 'webpack-chain';
import { PluginClass } from 'webpack-chain';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackBar from 'webpackbar';
import { requireModule } from '../utils/utils';
import { SweetConfig, SweetOptions, HtmlItem } from '../utils/types';

export default function(sweetConfig: SweetConfig, sweetOptions: SweetOptions, config: Config): void {
  const { mode, html, frame, serverRender, webpackLog = 'progress' }: SweetConfig = sweetConfig;
  const isDevelopment: boolean = mode === 'development';

  // 根据模式加载插件
  const envPlugins: Function = isDevelopment
    ? requireModule(path.join(__dirname, 'devPlugins'))
    : requireModule(path.join(__dirname, 'proPlugins'));

  config
    // moment
    .plugin('webpack.IgnorePlugin')
    .use(webpack.IgnorePlugin, [{
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }])
    .end()
    // 注入环境变量
    .plugin('webpack.DefinePlugin-sweet-env')
    .use(webpack.DefinePlugin, [{
      'process.env.SWEET_SERVER_RENDER': !!serverRender // 判断是否为ssr渲染
    }]);

  // env plugin
  envPlugins(sweetConfig, sweetOptions, config);

  // html模板
  if (html && typeof Array.isArray(html) && !serverRender) {
    let index: number = 0;

    for (const item of html) {
      const { template, excludeChunks, ...otherConfig }: HtmlItem = item;
      const info: ParsedPath = path.parse(template);

      config
        .plugin(`html-webpack-plugin: ${ index }`)
        .use(HtmlWebpackPlugin, [{
          inject: true,
          template,
          filename: `${ info.name }.html`,
          excludeChunks,
          mode,
          hash: !isDevelopment,
          ...otherConfig
        }]);

      index += 1;
    }
  }

  // vue插件的加载
  config.when(frame === 'vue',
    (config: Config): void => {
      const VueLoaderPlugin: PluginClass = require('vue-loader/lib/plugin');

      config
        .plugin('vue')
        .use(VueLoaderPlugin);
    }
  );

  // 当环境为测试时，不使用输出插件
  config
    .when(sweetConfig.frame !== 'test' && (!webpackLog || webpackLog === 'progress'),
      (config: Config): void => {
        config
          .plugin('progress')
          .use(WebpackBar, [serverRender ? {
            name: 'SSR Files Build',
            color: 'orange'
          } : {
            name: 'Files Build'
          }]);
      }
    );
}