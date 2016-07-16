module.exports = (gulp, plugins, directory, configuration) => {
  return () => {
    return gulp.src([
        plugins.joinPath(directory, '**', '*.ts'),
        '!' + plugins.joinPath(directory, 'imports', 'typings', '**', '*.ts')
      ])
      .pipe(plugins.tslint({
        configuration: require(configuration)
      }))
      .pipe(plugins.tslint.report('verbose'));
  };
};
