import { patchRequire } from 'fs-monkey';
import type { Context } from 'koa';
import * as Stream from 'stream';
import {
  formatTemplateData,
  folderPathAnalyze,
  filePathAnalyze,
  deleteCacheAndRequireModule,
  isReadStream,
  readStream
} from '../utils/utils';
import { getControllersFiles, getControllerData, getControllerDataByMemFs } from '../utils/controllers';
import createRenderEngine from '../utils/createRenderEngine';
import type { SweetOptions } from '../utils/types';

// 渲染新的html
function preRenderInit(sweetOptions: SweetOptions): Function {
  const basicPath: string = sweetOptions.basicPath;

  /**
   * @param { string } ctxPath: 相对路径
   * @param { Context } ctx: koa ctx
   * @param { string } serverRenderEntry: ssr文件入口
   */
  return async function preRender(ctxPath: string, ctx: Context, serverRenderEntry: string): Promise<string> {
    const renderEngine: Function = createRenderEngine(sweetOptions.renderType);
    const folderPathFile: string = folderPathAnalyze(ctxPath); // 格式化为：path/to/file，没有扩展名
    const formatFile: string = filePathAnalyze(ctxPath);       // 格式化为：path.to.file，没有扩展名

    // 不使用虚拟文件系统时，正常读取文件
    let data: any = {};

    if (sweetOptions.serverRenderOutputFileSystem) {
      data = await getControllerDataByMemFs(ctx, sweetOptions, folderPathFile, formatFile);
    } else {
      const controllersMap: Map<string, string> = await getControllersFiles(basicPath, sweetOptions.controllersDir);

      data = await getControllerData(ctx, sweetOptions, controllersMap, folderPathFile, formatFile, true);
    }

    // ssr渲染
    const html: Buffer = ctx.body;

    if (sweetOptions.serverRenderOutputFileSystem) {
      patchRequire(sweetOptions.serverRenderOutputFileSystem);
    }

    const server: Function = deleteCacheAndRequireModule(serverRenderEntry);
    const result: Stream | string = await server(ctxPath, ctx, data.initialState);
    const render: string = isReadStream(result) ? (await readStream(result)).toString() : result;

    return renderEngine(html.toString(), formatTemplateData({
      render,
      ...data
    }));
  };
}

export default preRenderInit;