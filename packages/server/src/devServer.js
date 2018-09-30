/* 开发环境 服务器 */
import http from 'http';
import http2 from 'http2';
import fs from 'fs';
import process from 'process';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import body from 'koa-body';
import mime from 'mime-types';
import koaWebpack from 'koa-webpack';
import { readFile, defaultRoutersPath, cleanRequireCache, registerConfig } from './utils/utils';
import preRender from './utils/preDevRender';

const app: Koa = new Koa();
const router: Router = new Router();

/* 基础配置 */
const sweetOptions: {
  basicPath: string
} = {
  basicPath: process.cwd() // 主目录
};

/**
 * compiler { Object }: webpack的compiler
 * httpPort { number }: http端口号
 * httpsPort { number }: https端口号
 * serverRender { boolean }: 开启服务器端渲染
 * serverRenderFile { string }: 服务器端渲染的主模块文件
 */
type devServerType = {
  compiler: Object,
  httpPort: number,
  httpsPort: number,
  serverRender: boolean,
  serverRenderFile: string
};

async function devServer(argv: Object = {}): Promise<void>{
  const {
    compiler,
    httpPort = 5050,
    httpsPort = 5051,
    serverRender,
    serverRenderFile = 'build/server.js'
  }: devServerType = argv;
  let formatServerRenderFile: ?string = null;

  // 将端口加入到服务端
  sweetOptions.httpPort = argv.httpPort;
  sweetOptions.httpsPort = argv.httpsPort;

  if(serverRender){
    formatServerRenderFile = path.isAbsolute(serverRenderFile)
      ? serverRenderFile
      : path.join(sweetOptions.basicPath, serverRenderFile);
  }

  /* post body */
  app.use(body());

  /* router */
  app.use(router.routes())
    .use(router.allowedMethods());

  /* webpack中间件 */
  const middleware: Function = await koaWebpack({
    compiler,
    hotClient: {
      host: {
        client: '*',
        server: '0.0.0.0'
      }
    }
  });

  app.use(middleware);

  /* webpack 重定向 */
  router.get(/^\/[^._\-]*$/, async(ctx: Object, next: Function): Promise<void>=>{
    const file: string = ctx.path;
    const mimeType: string = mime.lookup(file);
    if(file !== '/' && mimeType === false){
      ctx.path = '/';
      ctx._path = file;
    }
    await next();

    // 服务器端渲染
    if(serverRender && ctx.type === 'text/html'){
      ctx.body = await preRender(file, ctx, formatServerRenderFile, sweetOptions);
    }
  });

  /* 本地服务 */
  if(fs.existsSync(defaultRoutersPath(sweetOptions))){
    // 加载es6+环境
    const register: Function = require('@babel/register');
    const p: string = defaultRoutersPath(sweetOptions);

    register(registerConfig);

    cleanRequireCache(p);

    const routers: Object | Function = require(p);

    if('default' in routers) routers.default(router, sweetOptions);
    else routers(router, sweetOptions);
  }

  /* http服务 */
  http.createServer(app.callback())
    .listen(httpPort);

  /* https服务 */
  const key: string = path.join(sweetOptions.basicPath, './dev.key');
  const crt: string = path.join(sweetOptions.basicPath, './dev.crt');

  // 判断是否有证书
  if(fs.existsSync(key) && fs.existsSync(crt)){
    const keyString: string | ArrayBuffer = await readFile(key);
    const crtString: string | ArrayBuffer = await readFile(crt);
    const httpsConfig: Object = {
      allowHTTP1: true,
      key: keyString,
      cert: crtString
    };

    http2.createSecureServer(httpsConfig, app.callback()).listen(httpsPort);
  }
}

export default devServer;