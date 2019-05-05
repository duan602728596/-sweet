import * as process from 'process';
import * as log4js from 'koa-log4';
import * as Koa from 'koa';
import createFileConfig from './createFileConfig';
import createHttpConfig from './createHttpConfig';

/**
 * 生成log的中间件
 * @param { 'file' | 'http' } type: 类型
 */
interface Argu {
  pm2: boolean;
  url: string;
  basicPath: string;
}

interface ServerLog {
  accessLogger: Function;
  applicationLogger: object;
}

function serverLog(type: 'file' | 'http', argu: Argu = { pm2: false, url: '', basicPath: process.cwd() }): ServerLog {
  const config: object = type === 'http' ? createHttpConfig(argu.url, argu.pm2) : createFileConfig(argu.basicPath, argu.pm2);

  log4js.configure(config);

  return {
    accessLogger(ctx: Koa.Context, next: Function): Function {
      return log4js.koaLogger(log4js.getLogger('access'));
    },
    applicationLogger: log4js.getLogger('application')
  };
}

export default serverLog;