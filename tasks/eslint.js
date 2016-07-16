module.exports = (gulp, plugins, config) => {
  return () => {

    return gulp.src([
        '!' + plugins.joinPath(config.projectDir, 'jspm.conf.js'),
        plugins.joinPath(config.taskDir, '**', '*.js'),
        plugins.joinPath(config.projectDir, 'gulpfile.js')
      ])
      // eslint() attaches the lint output to the eslint property
      // of the file object so it can be used by other modules.
      .pipe(plugins.eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(plugins.eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(plugins.eslint.failAfterError());
  };
};
