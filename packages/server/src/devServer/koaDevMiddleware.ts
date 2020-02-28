import { IncomingMessage } from 'http';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { Context, Middleware } from 'koa';
import { Compiler } from 'webpack';

interface MiddlewareResponse {
  locals: any;
  set: Function;
  get: Function;
  send: Function;
  setHeader?: Function;
  end?: Function;
}

function middleware(wdm: Function, req: IncomingMessage, res: MiddlewareResponse): Promise<number> {
  const { send }: MiddlewareResponse = res;

  return new Promise((resolve: Function, reject: Function): void => {
    res.send = res.end = function end(): void {
      send.apply(this, arguments);
      resolve(0);
    };

    wdm(req, res, () => {
      resolve(1);
    });
  });
}

function koaDevMiddleware(compiler: Compiler, options: { [key: string]: any }): Middleware {
  const wdm: Function = webpackDevMiddleware(compiler, options);

  async function koaMiddleware(ctx: Context, next: Function): Promise<void> {
    const { req }: Context = ctx;
    const locals: any = ctx.locals || ctx.state;

    ctx.webpack = wdm;

    // 创建兼容express的res
    const expressRes: MiddlewareResponse = {
      locals,

      // 设置响应头
      set(): void {
        ctx.set.apply(ctx, arguments);
      },

      // 获取请求头
      get(): string {
        return ctx.request.get.apply(ctx, arguments);
      },

      // 设置返回值
      send(content: any): void {
        ctx.body = content;
      }
    };

    // 兼容函数
    Object.assign(expressRes, {
      setHeader: expressRes.set,
      end: expressRes.send
    });

    const runNext: number = await middleware(wdm, req, expressRes);

    if (runNext) {
      await next();
    }
  }

  Object.keys(wdm).forEach((p: any): void => {
    koaMiddleware[p] = wdm[p];
  });

  return koaMiddleware;
}

export default koaDevMiddleware;