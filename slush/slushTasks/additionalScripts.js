var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {
    if (answers.additionalScripts.length === 0) { return null; }

    var scriptsFramework = answers.scriptsFramework;
    var additionalScripts = answers.additionalScripts;
    var basePath = rootDirectory + '/templates/tools/cache';
    var bowerDependencies = [];

    var addDemoFiles = (additionalScripts.indexOf('demo') !== -1);

    if (additionalScripts.indexOf('jquery') !== -1) {
        bowerDependencies.push({"jquery": "*"});
    }

    if (additionalScripts.indexOf('modernizr') !== -1) {
        bowerDependencies.push({"modernizr": "*"});
    }

    var filesToCopy = [];
    var dictionary = {};
    dictionary['auto-replace']    = 'nerdery-auto-replace';
    dictionary['external-links']  = 'nerdery-external-links';
    dictionary['function-name']   = 'nerdery-function-name';
    dictionary['has-js']          = 'nerdery-has-js';
    dictionary['animation-frame'] = 'nerdery-request-animation-frame';

    additionalScripts.forEach(function(item) {
        if (dictionary.hasOwnProperty(item) === true) {
            var obj = {};
            obj[item] = './tools/cache/' + dictionary[item];

            bowerDependencies.push(obj);
            filesToCopy.push(rootDirectory + '/templates/tools/cache/' + dictionary[item] + '/**/*');
        }
    });

    gulp.task('additionalScripts', function(done) {
        gulp.src(filesToCopy,  { base: rootDirectory + '/templates' })
            .pipe(gulp.dest('./'))
            .on('end', function () {
                done();
            });
    });

    return {
        taskName: 'additionalScripts',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    };
};