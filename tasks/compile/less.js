module.exports = (gulp, plugins, config) => {
  return () => {
    return gulp.src([
        plugins.joinPath(config.stylesDir, 'reset.less'),
        plugins.joinPath(config.stylesDir, 'main.less'),
        plugins.joinPath(config.stylesDir, 'fonts.less'),
        plugins.joinPath(config.stylesDir, 'tabs.less')

      ])
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer('last 1 version'))
      .pipe(gulp.dest(config.stylesDir))
      .pipe(plugins.size());
  };
};
