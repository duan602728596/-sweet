import * as path from 'path';
import { cosmiconfig, Loader } from 'cosmiconfig';
import type { CosmiconfigResult, Config } from 'cosmiconfig/dist/types';
import { requireModule, requireCommonjsModule, isFileExists } from '@sweet-milktea/utils';
import type { SweetConfig, SweetOptions, Explorer, Info } from './types';

/* 创建cosmiconfig的js加载器 */
function createJsRegisterLoader(): Loader {
  return async function jsRegisterLoader(filepath: string, content: string): Promise<Config | null> {
    (await requireModule('@babel/register'))({
      presets: [[
        await requireModule('@sweet-milktea/babel-preset-sweet'),
        {
          env: {
            nodeEnv: true,
            modules: 'commonjs'
          },
          typescript: {
            use: true
          }
        }
      ]],
      cache: true,
      ignore: [/node_modules/],
      extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', 'cjs', '.tsx', '.ts']
    });

    return requireCommonjsModule(filepath);
  };
}

export type ConfigFile = SweetConfig | ((info: Info) => SweetConfig);

/* 获取配置文件 */
async function getConfigFile(sweetOptions: SweetOptions, configFile?: string): Promise<ConfigFile> {
  // @babel/register
  const jsRegisterLoader: Loader = createJsRegisterLoader();

  // 配置文件加载器
  const MODULE_NAME: string = 'sweet';
  const ERROR_MSG: string = 'Please configure the .sweetrc.js or sweet.config.mjs file first.';

  const explorer: Explorer = await cosmiconfig(MODULE_NAME, {
    searchPlaces: [
      `${ MODULE_NAME }.config.ts`,
      `${ MODULE_NAME }.config.tsx`,
      `.${ MODULE_NAME }rc.ts`,
      `.${ MODULE_NAME }rc.tsx`,
      `${ MODULE_NAME }.config.mjs`,
      `.${ MODULE_NAME }rc.mjs`,
      `${ MODULE_NAME }.config.js`,
      `.${ MODULE_NAME }rc.js`,
      `${ MODULE_NAME }.config.cjs`,
      `.${ MODULE_NAME }rc.cjs`,
      `${ MODULE_NAME }.config.jsx`,
      `.${ MODULE_NAME }rc.jsx`
    ],
    loaders: {
      '.mjs': jsRegisterLoader,
      '.js': jsRegisterLoader,
      '.cjs': jsRegisterLoader,
      '.jsx': jsRegisterLoader,
      '.ts': jsRegisterLoader,
      '.tsx': jsRegisterLoader
    },
    stopDir: sweetOptions.basicPath
  });

  if (typeof configFile === 'string') {
    // 加载其他的配置文件
    let sweetConfigFile: string;

    if (path.isAbsolute(configFile)) {
      sweetConfigFile = configFile;
    } else {
      sweetConfigFile = path.join(sweetOptions.basicPath, configFile);
    }

    if (await isFileExists(sweetConfigFile)) {
      return jsRegisterLoader(sweetConfigFile, '');
    } else {
      throw new Error(ERROR_MSG);
    }
  } else {
    // 加载默认的配置文件
    const searchResult: CosmiconfigResult = await explorer.search();

    if (searchResult === null) {
      throw new Error(ERROR_MSG);
    } else {
      return searchResult.config;
    }
  }
}

export default getConfigFile;