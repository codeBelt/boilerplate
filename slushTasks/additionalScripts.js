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

    var dictionary = {};
    dictionary['auto-replace']      = './tools/cache/nerdery-auto-replace';
    dictionary['external-links']    = './tools/cache/nerdery-external-links';
    dictionary['function-name']     = './tools/cache/nerdery-function-name';
    dictionary['has-js']            = './tools/cache/nerdery-has-js';
    dictionary['animation-frame']   = './tools/cache/nerdery-request-animation-frame';

    additionalScripts.forEach(function(item) {
        if (dictionary.hasOwnProperty(item) === true) {
            var obj = {};
            obj[item] = dictionary[item];

            bowerDependencies.push(obj);
        }
    });

    //console.log('answers', answers.additionalScripts);
    gulp.task('additionalScripts', function(done) {
        done();
    });

    return {
        taskName: 'additionalScripts',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    };
};