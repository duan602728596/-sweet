import path from 'path';
import fs from 'fs';
import process from 'process';
import { isNone } from './utils';

/* 列出目录下的所有文件 */
function readdir(filePath: string): Promise{
  return new Promise((resolve: Function, reject: Function): void=>{
    fs.readdir(filePath, (err: Error, files: []): void=>{
      if(err){
        reject(err);
      }else{
        resolve(files);
      }
    });
  }).catch((err: any): void=>{
    console.error(err);
  });
}

/* 判断是文件还是文件夹 */
function stat(filePath: string): Promise{
  return new Promise((resolve: Function, reject: Function): void=>{
    fs.stat(filePath, (err: Error, stats: Object): void=>{
      if(err){
        reject(err);
      }else{
        resolve(stats.isDirectory());
      }
    });
  }).catch((err: any): void=>{
    console.error(err);
  });
}

async function argvUpdate(argv: Object): Promise<void>{
  const update: Function = require('@sweet/util-tools').default;
  let folders: ?[] = [];

  if(isNone(argv.__DEV__)){
    folders = path.join(process.cwd());
  }else{
    const f: [] = await readdir(process.cwd(), 'packages');

    for(let i: number = 0, j: number = f.length; i < j; i++){
      const isDirectory: boolean = await stat(f[i]);

      if(isDirectory) folders.push(f[i]);
    }
  }

  await update(folders);
}

export default argvUpdate;