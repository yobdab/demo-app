module.exports = (plugins, config) => {
  return () => {
    return plugins.del.sync([
      plugins.joinPath(config.scriptsDir, '**', '*.js'),
      plugins.joinPath(config.scriptsDir, '**', '*.js.map'),

      plugins.joinPath(config.testDir, '**', '*.js'),
      '!' + plugins.joinPath(config.testDir, '*.conf.js'),
      plugins.joinPath(config.testDir, '**', '*.js.map'),

      plugins.joinPath(config.stylesDir, '**', '*.css'),

      plugins.joinPath(config.projectDir, 'dist')
    ]);
  };
};
