import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require: NodeRequire = createRequire(import.meta.url); // esm需要创建require

/**
 * 模块导入
 * @param { string } id: 模块名称
 * @param { boolean } exportAll: 导出所有模块
 */
export async function requireModule(id: string, exportAll?: boolean): Promise<any> {
  const module: { default: any } | any = await import(id);

  if (exportAll) {
    return module;
  }

  return (typeof module === 'object' && 'default' in module) ? module.default : module;
}

/**
 * 模块导入
 * @param { string } id: 模块名称
 * @param { boolean } exportAll: 导出所有模块
 */
export function requireCommonjsModule(id: string, exportAll?: boolean): any | Promise<any> {
  const module: { default: any } | any = require(id);

  if (exportAll) {
    return module;
  }

  return (typeof module === 'object' && 'default' in module) ? module.default : module;
}

/**
 * 加载json
 * @param { string } id: 模块名称
 */
export async function requireJson(id: string): Promise<any> {
  const data: string = await fs.promises.readFile(id, {
    encoding: 'utf8'
  });

  return JSON.parse(data);
}

/**
 * 判断模块是否存在
 * @param { string } id: 模块名称
 */
export function moduleExists(id: string): string | false {
  try {
    return require.resolve(id);
  } catch (err) {
    return false;
  }
}

/**
 * 清除模块缓存
 * @param { string } id: 模块名称
 */
export function cleanRequireCache(id: any): void {
  const modulePath: string = require.resolve(id);

  if (require.main) {
    require.main.children.splice(require.main.children.indexOf(id), 1);
  }

  delete require.cache[modulePath];
}

/**
 * 清除缓存并且模块导入
 * @param { string } id: 模块名称
 * @param { boolean } exportAll: 导出所有模块
 */
export function deleteCacheAndRequireModule(id: string, exportAll?: boolean): any | Promise<any> {
  cleanRequireCache(id);

  return requireCommonjsModule(id, exportAll);
}

/**
 * 判断文件是否存在
 * @param { string } file: 文件路径
 */
export async function isFileExists(file: string): Promise<boolean> {
  try {
    await fs.promises.access(file);

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * 从import.meta.url中解析__filename和__dirname
 * @param metaUrl
 */
export function metaHelper(metaUrl: string): { __filename: string; __dirname: string } {
  const __filename: string = fileURLToPath(metaUrl);
  const __dirname: string = path.dirname(__filename);

  return { __filename, __dirname };
}

export default {
  requireModule,
  requireCommonjsModule,
  requireJson,
  moduleExists,
  cleanRequireCache,
  deleteCacheAndRequireModule,
  isFileExists,
  metaHelper
};