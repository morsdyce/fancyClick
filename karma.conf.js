module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files
        // if you set it to current dir like here, all your other paths can just be relative to it
        basePath: '.',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // serve html fixtures
            { pattern: 'test/fixtures/*.html', watched: true, served: true, included: false },

            // dependencies
            'node_modules/jquery/dist/jquery.js',

            // test helper code
            'test/helpers/jasmine-jquery.js',
            'node_modules/karma-jasmine-async/src/jasmine.async.js',

            // set jasmine fixtures path
            // includes only this line: jasmine.getFixtures().fixturesPath = 'base/test/fixtures/';
            'test/helpers/fixtures.js',

            // code you want to test
            'src/fancyclick.js',

            // test code
            'test/spec/*.js'
        ],

        // list of files to exclude
        exclude: [],
        preprocessors: {'src/*.js': 'coverage' },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9877,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 20000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
