module.exports = (gulp, plugins, src) => {

  return () => {
    return runTSC(src);
  };

  function runTSC(directory) {
    const spawnSync = require('spawn-sync');
    const tscJs = plugins.joinPath(process.cwd(), 'node_modules/typescript/bin/tsc');
    const result = spawnSync('node', [tscJs, '-p', directory], {cwd: process.cwd()});

    if (result.status !== 0) {
      console.error('TSC error: ', result.stdout.toString());
      process.exit(result.status);
    }

    return result;
  }
};

