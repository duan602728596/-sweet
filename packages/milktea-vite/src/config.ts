import * as _ from 'lodash';
import type { InlineConfig } from 'vite';
import { basicConfig } from './config/basicConfig';
import { requireModule } from './utils/utils';
import type { SweetConfig, SweetOptions } from './utils/types';

/**
 * vite 配置
 * @param { SweetConfig } sweetConfig: 获取到的外部配置
 * @param { SweetOptions } sweetOptions: 内部挂载的一些配置
 */
export default function(sweetConfig: SweetConfig, sweetOptions: SweetOptions): InlineConfig {
  const { mode, frame, vite, chainVite }: SweetConfig = sweetConfig;

  const viteConfig: InlineConfig = _.merge(basicConfig(sweetOptions), {
    mode,
    css: {
      modules: {
        generateScopedName: '[path][name]__[local]___[hash:base64:6]'
      }
    },
    server: {
      middlewareMode: true
    }
  });

  if (frame === 'react') {
    // 添加react配置
    Object.assign(viteConfig, {
      esbuild: {
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        jsxInject: "import * as React from 'react';"
      },
      plugins: [requireModule('@vitejs/plugin-react-refresh')()]
    });
  } else if (frame === 'vue') {
    // 添加vue配置
    Object.assign(viteConfig, {
      plugins: [
        requireModule('@vitejs/plugin-vue')(),
        requireModule('@vitejs/plugin-vue-jsx')()
      ]
    });
  }

  if (chainVite) {
    chainVite(viteConfig);
  }

  return _.merge(viteConfig, vite);
}