import * as Koa from 'koa';
import * as brotli from 'iltorb';
import gzip from './gzip';
import buffer from './buffer';
import { readFile } from '../utils/utils';

function iltorb(): Function{
  return async function(ctx: Koa.Context, next: () => Promise<void>): Promise<void>{
    await next();

    const acceptEncoding: string = ctx.request.header['accept-encoding']; // 获取请求头的压缩参数
    const { body, type }: { body: Buffer | string, type: string } = ctx;           // 获取响应数据和文件的mime-type
    let input: Buffer | { path: string } = typeof body === 'string' ? buffer(body) : body;

    // 兼容staticCache缓存
    if(!Buffer.isBuffer(input) && typeof input === 'object' && Object.prototype.toString.call(input) === '[object Object]'){
      input = await readFile(input['path']); // 此时的input是ReadStream对象
    }

    if(!/^image/i.test(type) && acceptEncoding && Buffer.isBuffer(input)){
      // 当数据类型不为图片时，执行压缩

      let output: Buffer = null;

      if(acceptEncoding.includes('br')){
        // 使用brotli压缩
        output = await brotli.compress(input);

        ctx.set('Content-Encoding', 'br');
      }else if(acceptEncoding.includes('gzip')){
        // 使用gzip压缩
        output = await gzip(input);

        ctx.set('Content-Encoding', 'gzip');
      }

      ctx.body = output;
    }
  };
}

export default iltorb;