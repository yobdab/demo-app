module.exports = () => {
  const browserSync = require('browser-sync');
  const jspmUtil = require('../utils/jspm')();

  return () => {
    return browserSync.init({
      startPath: 'index.html',
      server: {
        baseDir: [
          'tasks/serve/scripts/',
          '.',
          'src',
          jspmUtil.resolveDir('demo-app')
        ]
      },
      host: 'localhost',
      browser: 'default',
      notify: false
    });
  };
};
