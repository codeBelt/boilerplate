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
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

var Util = require('./slush/utils/Util');
var prompts = require('./slush/prompts.json');

gulp.task('default', function(done) {

    // Ask the questions
    inquirer.prompt(prompts, function(answers) {
        if (!answers.moveon) {
            return done();
        }

        // List of all possible slush tasks
        var basePath = __dirname;
        var taskResults = [
            require('./slushTasks/requiredFiles')(basePath, answers),
            require('./slushTasks/markupBuildSystem')(basePath, answers),
            require('./slushTasks/stylesBuildSystem')(basePath, answers),
            require('./slushTasks/scriptsBuildSystem')(basePath, answers),
            require('./slushTasks/scriptsFramework')(basePath, answers),
            require('./slushTasks/additionalScripts')(basePath, answers)
        ];

        // Remove all null values in array
        taskResults = taskResults.filter(Boolean);

        // Gets all the task name that need to be ran.
        var slushTasks = Util.generateSlushTasks(taskResults);

        var packageJsonTask = require('./slushTasks/packageJson')(basePath, answers, taskResults);

        runSequence(slushTasks, packageJsonTask.taskName, done);
    });

});

//https://github.com/react-fullstack/slush-react-fullstack
//https://github.com/peterjuras/slush-react-express
//https://github.com/arvindr21/slush-meanjs