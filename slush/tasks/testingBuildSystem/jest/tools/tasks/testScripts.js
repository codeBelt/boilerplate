const gulp = require('gulp');
const jest = require('gulp-jest-iojs');

//http://www.undefinednull.com/2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/

gulp.task('testScripts', (done) => {
    gulp
        .src('__tests__')
        .pipe(jest({
            collectCoverage: true,
            // scriptPreprocessor: "./spec/support/preprocessor.js",
            // unmockedModulePathPatterns: [
            //     "node_modules/react"
            // ],
            // testDirectoryName: "spec",
            // testPathPattern: /.\/__tests__\/.*-test.js/,
            // testPathIgnorePatterns: [
            //     "node_modules",
            //     "spec/support"
            // ],
            // moduleFileExtensions: [
            //     "js",
            //     "json",
            //     "react"
            // ]
        }))
        .on('end', done);
});