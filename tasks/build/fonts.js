module.exports = (gulp, plugins, config) => {
  return () => {
    return gulp.src(plugins.joinPath(config.fontsDir, '**', '*'))
      .pipe(gulp.dest(plugins.joinPath(config.distDir, 'fonts')));
  };
};
