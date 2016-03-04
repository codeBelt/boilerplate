/*
 * slush-boilerplate
 * https://github.com/codeBelt/slush-boilerplate
 *
 * Copyright (c) 2016, codeBelt
 * Licensed under the MIT license.
 */

'use strict';


var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'CLIENT.Project'
    }, {
        name: 'projectSlug',
        message: 'What would you like the slug to be?',
        default: 'client-project'
    }, {
        name: 'markupBuildSystem',
        message: 'Select a stylesheet engine?',
        choices: [{
            name: "None",
            value: "none"
        }, {
            name: "Includes",
            value: "includes"
        }, {
            name: "Handlebars",
            value: "handlebars"
        }],
        default: 'handlebars',
        type: 'list'
    }, {
        name: 'markupFeatures',
        message: 'Select a stylesheet engine?',
        choices: [{
            name: "Icons",
            value: "icons"
        }, {
            name: "SEO Meta Data",
            value: "seo"
        }, {
            name: "XHTML Strict Doctype (legacy)",
            value: "xhtml"
        }, {
            name: "Imagemin",
            value: "imagemin"
        }],
        default: '',
        type: 'checkbox'
    }, {
        name: 'stylesBuildSystem',
        message: 'Which styles build system?',
        choices: [{
            name: "None",
            value: "none"
        }, {
            name: "Sass",
            value: "sass"
        }],
        default: 'sass',
        type: 'list'
    }, {
        name: 'stylesFeatures',
        message: 'Any additional stylesheets?',
        choices: [{
            name: "Print",
            value: "print"
        }, {
            name: "IE7 Conditional",
            value: "ie7"
        }, {
            name: "IE8 Conditional",
            value: "ie8"
        }, {
            name: "IE9 Conditional",
            value: "ie9"
        }],
        default: '',
        type: 'checkbox'
    }, {
        name: 'scriptsBuildSystem',
        message: 'Which scripts build system?',
        choices: [{
            name: "None",
            value: "none"
        }, {
            name: "ES6 (Babel)",
            value: "es6"
        }, {
            name: "ES6 (TypeScript)",
            value: "typescript"
        }, {
            name: "RequireJS (legacy)",
            value: "requirejs"
        }],
        default: 'es6',
        type: 'list'
    }, {
        type: 'list',
        name: 'stylesheetEngine',
        message: 'Select a stylesheet engine?',
        choices: [{
            name: "CSS",
            value: "css"
        }, {
            name: "SASS",
            value: "sass"
        }, {
            name: "LESS",
            value: "less"
        }, {
            name: "Stylus",
            value: "stylus"
        }],
        default: 'css'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName);
            console.log("answers", answers);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
