module.exports = (gulp, plugins, config) => {
  return () => {
    return gulp.src(plugins.joinPath(config.stylesDir, '**', '*'))
      .pipe(gulp.dest(plugins.joinPath(config.distDir, 'styles')));
  };
};
