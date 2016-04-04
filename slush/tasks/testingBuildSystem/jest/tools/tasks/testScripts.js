const gulp = require('gulp');
const jest = require('gulp-jest-iojs');

//http://www.undefinednull.com/2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/

gulp.task('testScripts', (done) => {
    gulp
        .src('__tests__').pipe(jest({
            collectCoverage: true,
            scriptPreprocessor: '../node_modules/babel-jest',
            unmockedModulePathPatterns: [
                "node_modules"
            ],
            testPathIgnorePatterns: [
                "node_modules"
            ],
            testFileExtensions: [
                "es6",
                "js"
            ],
            moduleFileExtensions: [
                "ts",
                "js",
                "es6"
            ]
        }))
        .on('end', done);
});
