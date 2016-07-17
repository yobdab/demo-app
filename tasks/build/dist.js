module.exports = (gulp, plugins, config) => {
  const distFileName = 'index.js';
  const outFile = plugins.joinPath(config.distDir, distFileName);
  const Builder = require('jspm').Builder;
  const builder = new Builder();

  return () => {
    return beginBuild()
      .then(buildSFX)
      .then(cssPathFix)
      .then(copyIndex)
        .then(copySystemJs)
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
      .pipe(plugins.replace('(src/', '('))
      .pipe(gulp.dest(config.distDir));
  }

  function copyIndex() {
    const indexFile = plugins.joinPath(config.projectDir, 'index.html');
    const source = gulp.src(['./src/scripts/index.js'], {read: false})
    return gulp.src(indexFile)
      .pipe(plugins.inject(source))
      .pipe(plugins.replace('src/scripts/', ''))
      .pipe(plugins.replace('src/', ''))
      .pipe(plugins.replace('/index.js', 'index.js'))
      .pipe(plugins.replace('vendor/jspm_packages/', ''))
      .pipe(plugins.stripCode({
        start_comment: 'start-dev-block',
        end_comment: 'end-dev-block'
      }))
      .pipe(gulp.dest(config.distDir));

  }


  function copySystemJs() {
    const file = plugins.joinPath(config.projectDir, 'vendor/jspm_packages/system.js');
    return gulp.src(file)
      .pipe(gulp.dest(config.distDir));
  }

};
