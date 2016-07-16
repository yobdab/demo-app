module.exports = (plugins, dir) => {
  return (done) => {
    const Server = require('karma').Server;
    return new Server({
      configFile: plugins.joinPath(dir, 'karma.conf.js'),
      action: require('minimist')(process.argv).watch ? 'watch' : 'run'
    }, done).start();
  };
};
