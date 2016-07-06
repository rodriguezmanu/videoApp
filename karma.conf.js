// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // frameworks: [
    //         'mocha',
    //         'chai',
    //         'sinon'
    //         ],

    frameworks:['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/es5-shim/es5-shim.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/json3/lib/json3.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-translate/angular-translate.js',
      'client/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'client/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'client/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'client/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'client/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'client/bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
      'client/bower_components/ng-dialog/js/ngDialog.js',
      'client/bower_components/isMobile/isMobile.js',
      'client/bower_components/angular-translate-recaptcha-dynamic/angular-translate-recaptcha-dynamic.js',
      'client/bower_components/vsGoogleAutocomplete/dist/vs-google-autocomplete.js',
      'client/bower_components/vsGoogleAutocomplete/dist/vs-autocomplete-validator.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/angular-md5/angular-md5.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-scenario/angular-scenario.js',
      // endbower
      'client/app/app.js',
      'client/**/*.module.js',
      'client/app/**/*.js',
      'client/components/**/*.js',
      'client/app/**/*.html',
      'client/components/**/*.html',
      'client/specHelper.js'//eliminar
    ],

    preprocessors: {
      '**/*.jade': 'ng-jade2js',
      '**/*.html': 'html2js',
      'client/app/**/*.js': 'babel',
      '**/*.coffee': 'coffee',
      'client/app/**/*.js': ['coverage'],
      'client/components/**/*.js': ['coverage', 'babel']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },


    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },


    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],
  });
};
