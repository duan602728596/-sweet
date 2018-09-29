import fs from 'fs';
import path from 'path';
import { replaceTemplate, defaultInterfacePath, cleanRequireCache, pathAnalyze, registerConfig } from './utils';

// 渲染新的html
async function preRender(file: string, ctx: Object, serverRenderFile: string): Promise<Object>{
  cleanRequireCache(serverRenderFile);

  const formatFile: string = `${ path.join(defaultInterfacePath, pathAnalyze(file)) }.js`;
  const defaultFile: string = path.join(defaultInterfacePath, 'default.js');
  let data: Object = {};

  // 读取模块
  if(fs.existsSync(formatFile)){
    // 加载es6+环境
    const register: Function = require('@babel/register');

    register(registerConfig);

    cleanRequireCache(formatFile);

    const file: Object | Function = require(formatFile);

    if('default' in file) data = await file.default(ctx);
    else data = await file(ctx);
  }else if(fs.existsSync(defaultFile)){
    // 读取默认模块
    // 加载es6+环境
    const register: Function = require('@babel/register');

    register(registerConfig);

    cleanRequireCache(defaultFile);

    const file: Object | Function = require(defaultFile);

    if('default' in file) data = await file.default(ctx);
    else data = await file(ctx);
  }

  const html: ArrayBuffer = ctx.body;

  const server: Function = require(serverRenderFile).default;
  const render: string = await server(file, ctx, data.initialState);

  return replaceTemplate(html.toString(), {
    render,
    ...data
  });
}

export default preRender;