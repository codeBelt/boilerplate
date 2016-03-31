'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');
const prettify = require('gulp-prettify');
const replace = require('gulp-replace');

module.exports = (answers) => {

    const type = answers.markupBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'includes':
            devDependencies = ['gulp', 'gulp-file-include'];
            break;
        case 'handlebars':
            devDependencies = ['gulp', 'handlebars', 'handlebars-helpers', 'gulp-hb', 'handlebars-layouts', 'gulp-rename', 'gulp-replace', 'gulp-prettify'];
            break;
    }

    // Files and folder locations
    const taskPath = __dirname + '/' + type + '/tools/**/*';
    const sourcePath = __dirname + '/' + type + '/src/**/*';

    // Gulp task
    gulp.task('markupBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            // Uses Underscore/Lodash templates to add or remove sections
            // which is determined what data is the "answers" object.
            .pipe(template(answers))
            // Prettifies the files after Underscore/Lodash templates adds
            // or removes the sections.
            .pipe(prettify({
                indent_size: 4,
                indent_inner_html : true,
                preserve_newlines : false,
                wrap_line_length: 999999,
                unformatted: [
                    'a', 'b', 'code', 'i', 'p',
                    'pre', 'small', 'span',
                    'sub', 'sup', 'u', 'textarea',
                    'strong', 'em', 'svg'
                ]
            }))
            // Fixes format issue after prettify.
            // It will take @@include and put it on a new line.
            .pipe(replace(/@@include/g, '\n@@include'))
            // Fixes format issue after prettify.
            // For example if will take {{#block "scriptsBody"}} {{/block}}
            // and put {{/block}} on a new line plus tab it over two times.
            .pipe(replace(/}} {{\/block}}/g, '}}\n\t\t{{/block}}'))
            // Copies the files to the src folder.
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    // Return data
    return {
        taskName: 'markupBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
