/* 清除已编译的代码 */
const util = require('util');
const path = require('path');
const rimraf = require('rimraf');
const { dir, packageNames } = require('./config');

const rimrafPromise = util.promisify(rimraf);

async function main() {
  const queue = [];

  for (const packageName of packageNames) {
    const packageDir = path.join(dir, packageName, 'lib');
    const packageESMDir = path.join(dir, packageName, 'esm');

    queue.push(
      rimrafPromise(packageDir),
      rimrafPromise(packageESMDir)
    );
  }

  await Promise.all(queue);
}

main();