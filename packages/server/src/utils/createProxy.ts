import * as fs from 'fs';
import * as _ from 'lodash';
import * as Koa from 'koa';
import * as connect from 'koa-connect';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { defaultProxyPath, requireModule } from './utils';
import { SweetOptions, LogLevel } from './types';

type ProxyConfig = { [key: string]: Options };

/* 添加代理中间件 */
function addMiddleware(app: Koa, proxyConfig: ProxyConfig, isDevelopment: boolean, env?: string): void {
  const logLevel: LogLevel | undefined = env === 'test' ? 'error' : (isDevelopment ? 'info' : 'error');

  for (const key in proxyConfig) {
    const config: Options = proxyConfig[key];

    app.use(connect(
      createProxyMiddleware(key, {
        changeOrigin: true,
        logLevel,
        ...config
      })
    ));
  }
}

/**
 * 本地代理
 * TODO: 本地代理无法清除缓存
 */
async function createProxy(sweetOptions: SweetOptions, app: Koa, isDevelopment: boolean, env?: string): Promise<void> {
  try {
    const defaultProxy: { ts: string; js: string; json: string } = defaultProxyPath(sweetOptions.basicPath);
    const findFiles: Array<string> = [
      defaultProxy.ts,
      defaultProxy.js,
      defaultProxy.json
    ];

    if (sweetOptions.proxyFile) {
      findFiles.unshift(sweetOptions.proxyFile);
    }

    for (const findFile of findFiles) {
      if (fs.existsSync(findFile)) {
        const module: any = requireModule(findFile);

        if (_.isPlainObject(module)) {
          await addMiddleware(app, module, isDevelopment, env);
        } else if (typeof module === 'function') {
          const proxyConfig: ProxyConfig = await module(sweetOptions, app);

          await addMiddleware(app, proxyConfig, isDevelopment, env);
        }

        break;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export default createProxy;