module.exports = (config) => {
  config.set({
    logLevel: config.LOG_INFO, // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    singleRun: true,
    colors: true,
    autoWatch: false,
    exclude: [],
    port: 9999,
    basePath: '../',
    browsers: ['PhantomJS'],
    frameworks: [
      'jspm',
      'mocha',
      'chai-sinon'
    ],
    reporters: [
      'junit',
      'progress',
      'mocha',
      'coverage'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jspm',
      'karma-mocha',
      'karma-chai-sinon',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-mocha-reporter'
    ],
    jspm: {
      config: 'jspm.conf.js',
      serveFiles: [
        'src/**/*.*',
        'src/**/*.*.map',
        'test/**/*.*.map'
      ],
      loadFiles: [
        'test/builders/**/*.js',
        'test/utils/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    mochaReporter: {
      output: 'minimal',
      showDiff: 'unified'
    },
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    coverageReporter: {
      dir: 'report/coverage/',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'cobertura', subdir: 'cobertura'}
      ]
    },
    junitReporter: {
      outputDir: 'report/',
      outputFile: '../test-results.xml',
      suite: ''
    },
    proxies: {
      '/resources/': '/base/test/resources/'
    }
  });
};
