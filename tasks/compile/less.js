module.exports = (gulp, plugins, config) => {
  return () => {
    return gulp.src([
        plugins.joinPath(config.stylesDir, 'reset.less'),
        plugins.joinPath(config.stylesDir, 'main.less'),
        plugins.joinPath(config.stylesDir, 'fonts.less'),
        plugins.joinPath(config.stylesDir, 'tabs.less'),
        plugins.joinPath(config.stylesDir, 'loader.less')

      ])
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer({browsers: ['last 2 version']}))
      .pipe(gulp.dest(config.stylesDir))
      .pipe(plugins.size());
  };
};
