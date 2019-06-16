import * as https from 'https';
import { Server } from 'https';
import * as webpack from 'webpack';
import * as koaWebpack from 'koa-webpack';
import * as _ from 'lodash';

interface MiddlewareConfig {
  compiler?: webpack.Compiler;
  hotClient: {
    host: {
      client: string;
      server: string;
    };
    https: boolean;
    server?: Server;
    logLevel?: string;
  };
  devMiddleware: {
    serverSideRender: boolean;
    logLevel?: string;
  };
}

/**
 * middleware配置
 * @param { webpack.Compiler | undefined } compiler
 * @param { string | undefined } env: 环境
 * @param { boolean } useHttps: 是否使用https
 * @param { Server | undefined } server: 服务
 */
export function createMiddlewareConfig(
  compiler: webpack.Compiler | undefined,
  env: string | undefined,
  useHttps: boolean,
  server: Server | undefined
): MiddlewareConfig {
  const middlewareConfig: {
    compiler?: webpack.Compiler;
    hotClient: {
      host: {
        client: string;
        server: string;
      };
      https: boolean;
      server?: Server;
      logLevel?: string;
    };
    devMiddleware: {
      serverSideRender: boolean;
      logLevel?: string;
    };
  } = {
    compiler,
    hotClient: {
      host: {
        client: '*',
        server: '0.0.0.0'
      },
      https: useHttps,
      server
    },
    devMiddleware: {
      serverSideRender: true
    }
  };

  // 测试配置
  if (env === 'test') {
    middlewareConfig.hotClient.logLevel = 'silent';
    middlewareConfig.devMiddleware.logLevel = 'silent';
  }

  return middlewareConfig;
}

/**
 * koa-webpack中间件配置
 * @param { webpack.Compiler | undefined } compiler
 * @param { string } env: 环境
 * @param { boolean } useHttps: 是否使用https
 * @param { string | undefined } keyFile: key
 * @param { string | undefined } crtFile: cert
 */
async function createKoaWebpack(
  compiler: webpack.Compiler | undefined,
  env: string | undefined,
  useHttps: boolean,
  keyFile: Buffer | undefined,
  crtFile: Buffer | undefined
): Promise<koaWebpack.Middleware<any>> {
  let server: Server | undefined = undefined;

  if (useHttps && keyFile && crtFile) {
    server = https.createServer({
      key: keyFile,
      cert: crtFile
    }).listen(_.random(15000, 50000), '127.0.0.1');
  }

  const middlewareConfig: MiddlewareConfig = createMiddlewareConfig(compiler, env, useHttps, server);
  const middleware: koaWebpack.Middleware<any> = await koaWebpack(middlewareConfig);

  return middleware;
}

export default createKoaWebpack;