import * as process from 'process';
import * as _ from 'lodash';
import type { Configuration, Stats } from 'webpack';
import webpackConfig from './config';
import webpackServerRenderConfig from './server';
import webpackDllConfig from './dll';
import configFile from './utils/configFile';
import type { SweetConfig, SweetOptions, Mode, WebpackLog, Environment, Info } from './utils/types';

type SweetConfigArgs = SweetConfig | string | null | undefined;

interface FuncArgs {
  sweetConfig?: SweetConfigArgs;
  mode?: Mode;
  webpackLog?: WebpackLog;
  hot?: boolean;
}

/* 基础配置 */
const sweetOptions: SweetOptions = {
  basicPath: process.cwd(), // 主目录
  environment: 'client'     // 当前环境
};

/* 获取配置 */
function getConfig(environment: Environment, sweetConfig: SweetConfigArgs): SweetConfig {
  if (typeof sweetConfig === 'string') {
    // 自定义配置文件路径
    const config: SweetConfig | ((info: Info) => SweetConfig) = configFile(sweetOptions, sweetConfig);

    return typeof config === 'function' ? config({ environment }) : config;
  } else if (_.isPlainObject(sweetConfig)) {
    // 自定义配置文件
    return sweetConfig as SweetConfig;
  } else {
    // 默认的配置文件
    const config: SweetConfig | ((info: Info) => SweetConfig) = configFile(sweetOptions);

    return typeof config === 'function' ? config({ environment }) : config;
  }
}

/* webpack的回调函数，只显示错误 */
export function callbackOnlyError(err: Error, stats: Stats): void {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString({
      colors: true,
      assets: false,
      entrypoints: false,
      builtAt: false,
      hash: false,
      modules: false,
      version: false,
      timings: false
    }));
  }
}

/* webpack的回调函数 */
export function callback(err: Error, stats: Stats): void {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString({
      colors: true
    }));
  }
}

/**
 * webpack配置
 * @param { SweetConfig | string | null | undefined } args.sweetConfig: webpack配置，覆盖文件，优先级最高
 * @param { string } args.mode: 开发环境，覆盖配置的开发环境
 * @param { string } args.webpackLog: 覆盖日志的显示
 * @param { boolean } args.hot: 添加webpack.HotModuleReplacementPlugin插件，开启热更新功能
 */
export function config(args: FuncArgs = {}): Configuration {
  const { sweetConfig, mode, webpackLog, hot }: FuncArgs = args;
  const config: SweetConfig = getConfig('client', sweetConfig);

  if (config) {
    if (mode) {
      config.mode = mode;
    }

    if (webpackLog) {
      config.webpackLog = webpackLog;
    }

    if (hot) {
      config.hot = hot;
    }
  }

  return webpackConfig(config, sweetOptions);
}

/**
 * 服务器端渲染的webpack配置
 * @param { SweetConfig | string | null | undefined } args.sweetConfig: webpack配置，覆盖文件，优先级最高
 * @param { string } args.mode: 开发环境，覆盖配置的开发环境
 * @param { string } args.webpackLog: 覆盖日志的显示
 */
export function serverRenderConfig(args: FuncArgs = {}): Configuration {
  const { sweetConfig, mode, webpackLog }: FuncArgs = args;
  const config: SweetConfig = getConfig('server', sweetConfig);

  sweetOptions.environment = 'server';

  if (config) {
    if (mode) {
      config.mode = mode;
    }

    if (webpackLog) {
      config.webpackLog = webpackLog;
    }
  }

  return webpackServerRenderConfig(config, sweetOptions);
}

/**
 * webpack的dll文件配置
 * @param { SweetConfig | string | null | undefined } args.sweetConfig: webpack配置，覆盖文件，优先级最高
 * @param { string } args.webpackLog: 覆盖日志的显示
 */
export function dllConfig(args: FuncArgs = {}): Configuration {
  const { sweetConfig, webpackLog }: FuncArgs = args;
  const config: SweetConfig = getConfig('dll', sweetConfig);

  sweetOptions.environment = 'dll';

  if (config && webpackLog) {
    config.webpackLog = webpackLog;
  }

  return webpackDllConfig(config, sweetOptions);
}

export default {
  callbackOnlyError,
  callback,
  config,
  serverRenderConfig,
  dllConfig
};