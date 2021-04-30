import type { ViteDevServer } from 'vite';
import { Argv } from '../utils/types';
import { requireModule } from '@sweet-milktea/utils';
import type { MilkVite } from '@sweet-milktea/milktea-vite/src/utils/types';
import type { DevServer } from '@sweet-milktea/server/src/utils/types';

/* vite-start 命令 */
async function argvViteStart(argv: Argv): Promise<void> {
  const milkteaVite: MilkVite = await requireModule('@sweet-milktea/milktea-vite');
  const devServer: DevServer = await requireModule('@sweet-milktea/server/devServer');

  const {
    config,
    httpPort,
    httpsPort,
    serverRender,
    serverRenderRoot,
    serverRenderFile,
    renderType,
    httpsKey,
    httpsCert,
    redirectToHttps,
    useBabelRegister
  }: Argv = argv;
  const vite: ViteDevServer = await milkteaVite.config({
    sweetConfig: config,
    mode: 'development'
  });

  devServer({
    compiler: vite,
    httpPort,
    httpsPort,
    serverRender,
    serverRenderRoot,
    serverRenderFile,
    renderType,
    httpsKey,
    httpsCert,
    redirectToHttps,
    useBabelRegister,
    vite: true
  });
}

export default argvViteStart;