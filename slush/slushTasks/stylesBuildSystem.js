var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    var styleType = answers.stylesBuildSystem;
    var devDependencies = [];

    switch (styleType) {
        case 'none':
            devDependencies = [];
            break;
        case 'sass':
            devDependencies = [];
            break;
    }

    var basePath = rootDirectory + '/templates/tools/tasks/stylesBuildSystem';
    basePath += '/' + styleType + '/buildStyles.js';

    gulp.task('stylesBuildSystem', function(done) {
        gulp.src(basePath)
            .pipe(gulp.dest('./tools/tasks/'))
            .on('end', function () {
                done();
            });
    });

    // List dependencies for this package
    return {
        taskName: 'stylesBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};