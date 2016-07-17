module.exports = (gulp, plugins, config) => {
  return () => {
    return gulp.src(plugins.joinPath(config.publicDir, '**', '*'))
      .pipe(gulp.dest(plugins.joinPath(config.distDir, 'public')));
  };
};
