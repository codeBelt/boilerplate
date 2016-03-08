var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    gulp.task('requiredFiles', function(done) {
        var paths = [
            rootDirectory + '/templates/**',
            rootDirectory + '/templates/.*',
            '!' + rootDirectory + '/templates/src/**/*',
            '!' + rootDirectory + '/templates/tools/cache/**/*',
            '!' + rootDirectory + '/templates/tools/tasks/**/*',
            '!' + rootDirectory + '/templates/package.json'
        ];

        gulp.src(paths)
            .pipe(gulp.dest('./'))
            .on('end', function () {
                done();
            });
    });

    return {
        taskName: 'requiredFiles',
        devDependencies: ['gulp', 'gulp-util', 'gulp-load-plugins'],
        bowerDependencies: []
    };
};