module.exports = () => {
  const resolve = require('jspm-resolve');
  const path = require('path');

  function sync(packageName) {
    return resolve.sync(packageName, {});
  }

  return {
    resolve: (packageName) => {
      return sync(packageName);
    },
    resolveDir: (packageName) => {
      return path.dirname(sync(packageName));
    }
  };

};
