/*
 * slush-boilerplate
 * https://github.com/codeBelt/slush-boilerplate
 *
 * Copyright (c) 2016, codeBelt
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var inquirer = require('inquirer');
var template = require('gulp-template');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var prettify = require('gulp-jsbeautifier');

var Util = require('./slush/utils/Util');
var prompts = require('./slush/prompts.json');
var devDependenciesData = require('./slush/devDependencies.json');


//gulp.task('clean', function (done) {
//    var path = __dirname + '/test/';
//    return gulp
//        .src([path], {read: false, force: true})
//        .pipe(clean())
//        .on('end', function () {
//            done();
//        });
//});

gulp.task('default', function(done) {

    // Ask the questions
    inquirer.prompt(prompts, function(answers) {
        if (!answers.moveon) {
            return done();
        }

        // List of all possible slush tasks
        var taskResults = [
            require('./slushTasks/requiredFiles')(__dirname, answers),
            require('./slushTasks/markupBuildSystem')(__dirname, answers),
            require('./slushTasks/stylesBuildSystem')(__dirname, answers),
            require('./slushTasks/scriptsBuildSystem')(__dirname, answers),
            require('./slushTasks/framework')(__dirname, answers),
            require('./slushTasks/additionalScripts')(__dirname, answers)
        ];

        // Combined all the slush tasks that need to be ran
        var slushTasks = Util.generateSlushTasks(taskResults);

        // Combined all dev dependencies returned from the slush tasks
        var devDependencies = Util.generateUniqueDevDependencies(taskResults);



        var devDependencyHash = {};
        devDependencies.forEach(function(item) {
            devDependencyHash[item] = devDependenciesData[item];
        });




        // TODO: move or clean up
        gulp.task('packageJson', function (done) {
            // TODO: make a clone of answers.
            answers.devDependencies = JSON.stringify(devDependencyHash);
            gulp
                .src([__dirname + '/templates/package.json'])
                .pipe(template(answers))
                .pipe(prettify({ indent_size: 2 }))
                .pipe(gulp.dest('./'))
                .on('end', function () {
                    done();
                });
        });




        runSequence(slushTasks, 'packageJson', done);
    });

});

//https://github.com/react-fullstack/slush-react-fullstack
//https://github.com/peterjuras/slush-react-express
//https://github.com/arvindr21/slush-meanjs