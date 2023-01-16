import * as fs from 'fs-extra';
import * as childProcess from 'child_process';

import logger from 'jet-logger';

(async () => {

  try {

    // Remove current build
    await remove('./dist');

    // Copy back-end files
    await exec('tsc --build ./tsconfig.server.prod.json', './')

  } catch (err) {

    logger.err(err);
  }

})();

function remove(loc: string): Promise<void> {

  return new Promise((res, rej) => {

    return fs.remove(loc, (err) => {

      return (!!err ? rej(err) : res());
    });
  });
}


function copy(src: string, dest: string): Promise<void> {

  return new Promise((res, rej) => {

    return fs.copy(src, dest, (err) => {

      return (!!err ? rej(err) : res());
    });
  });
}


function exec(cmd: string, loc: string): Promise<void> {

  return new Promise((res, rej) => {

    return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {

      if (!!stdout) {

        logger.info(stdout);
      }

      if (!!stderr) {

        logger.warn(stderr);
      }

      return (!!err ? rej(err) : res());
    });
  });
}
