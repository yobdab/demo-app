const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'yargs', 'util', 'minimist', 'username', 'del', 'eslint']
});
plugins.joinPath = require('path').join;

const config = {
  projectDir: __dirname,
  appDir: plugins.joinPath(__dirname, 'src'),
  testDir: plugins.joinPath(__dirname, 'test'),
  distDir: plugins.joinPath(__dirname, 'dist'),
  fontsDir: plugins.joinPath(__dirname, 'src', 'fonts'),
  localeDir: plugins.joinPath(__dirname, 'src', 'locale'),
  taskDir: plugins.joinPath(__dirname, 'tasks'),
  scriptsDir: plugins.joinPath(__dirname, 'src', 'scripts'),
  stylesDir: plugins.joinPath(__dirname, 'src', 'styles'),
  viewsDir: plugins.joinPath(__dirname, 'src', 'views'),
  publicationsDir: plugins.joinPath(__dirname, 'src', 'publications'),
  publicationsDistDir: plugins.joinPath(__dirname, 'dist', 'publications'),
  artifactsDir: plugins.joinPath(__dirname, 'artifacts'),
  tslintSrcConf: plugins.joinPath(__dirname, 'src', 'scripts', 'tslint.json'),
  tslintTestConf: plugins.joinPath(__dirname, 'test', 'tslint.json')
};

gulp.task('dist:fonts', require('./tasks/build/fonts')(gulp, plugins, config));
gulp.task('dist:build', ['compile'], require('./tasks/build/dist')(gulp, plugins, config));
gulp.task('dist', ['dist:fonts', 'dist:build']);

gulp.task('clean', require('./tasks/clean')(plugins, config));
gulp.task('build', ['check', 'test', 'dist']);
gulp.task('serve', ['compile'], require('./tasks/serve/serve')());
gulp.task('test', ['compile'], require('./tasks/test')(plugins, config.testDir));

gulp.task('check:eslint', require('./tasks/eslint')(gulp, plugins, config));
gulp.task('check:tslint', ['check:tslint:src', 'check:tslint:test']);
gulp.task('check:tslint:src', require('./tasks/tslint')(gulp, plugins, config.scriptsDir, config.tslintSrcConf));
gulp.task('check:tslint:test', require('./tasks/tslint')(gulp, plugins, config.testDir, config.tslintTestConf));
gulp.task('check', ['check:eslint', 'check:tslint']);

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('compile:styles', require('./tasks/compile/less')(gulp, plugins, config));
gulp.task('compile:src', require('./tasks/compile/typescript')(gulp, plugins, config.scriptsDir));
gulp.task('compile:test', require('./tasks/compile/typescript')(gulp, plugins, config.testDir));
gulp.task('compile', ['clean', 'compile:src', 'compile:test', 'compile:styles']);
