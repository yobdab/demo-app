module.exports = (gulp, plugins, config) => {
  const distFileName = 'index.js';
  const outFile = plugins.joinPath(config.distDir, distFileName);
  const jspmUtil = require('../utils/jspm')();
  const Builder = require('jspm').Builder;
  const builder = new Builder();

  return () => {
    return beginBuild()
      .then(buildSFX)
      .then(cssPathFix)
      .then(copyDemoApp)
      .then(copyIndex)
      .then(() => console.log('Build complete'))
      .catch((err) => console.log('Build Failed', err));
  };

  function beginBuild() {
    builder.reset();
    return builder.loadConfig(plugins.joinPath(config.projectDir, 'jspm.conf.js'));
  }

  function buildSFX() {
    const moduleName = 'app';
    const buildConfig = {
      format: 'global',
      sourceMaps: false,
      minify: false
    };
    return builder.buildStatic(moduleName, outFile, buildConfig);
  }

  function cssPathFix() {
    return gulp.src(outFile)
      .pipe(plugins.replace('(src/', '(')) // ... ;(
      .pipe(gulp.dest(config.distDir));
  }

  function copyDemoApp() {
    return gulp.src(jspmUtil.resolve('demo-app'))
      .pipe(gulp.dest(config.distDir));
  }

  function copyIndex() {
    const indexFile = plugins.joinPath(config.projectDir, 'index.html');
    return gulp.src(indexFile)
      .pipe(gulp.dest(config.distDir));
  }

};
