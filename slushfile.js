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


gulp.task('default', function(done) {
    var prompts = require('./slush/prompts.json');

    // Ask the questions.
    inquirer.prompt(prompts, function(answers) {
        if (!answers.moveon) {
            return done();
        }

        // List of all possible slush tasks.
        var basePath = __dirname;

        // List of gulp tasks. Tasks will return 'null' if they don't need to be ran.
        var taskResults = [
            require('./slush/slushTasks/requiredFiles')(basePath, answers),
            require('./slush/slushTasks/markupBuildSystem')(basePath, answers),
            require('./slush/slushTasks/stylesBuildSystem')(basePath, answers),
            require('./slush/slushTasks/scriptsBuildSystem')(basePath, answers),
            require('./slush/slushTasks/scriptsFramework')(basePath, answers),
            require('./slush/slushTasks/additionalScripts')(basePath, answers)
        ];

        // Remove all null values in array.
        taskResults = taskResults.filter(Boolean);

        // Gets all the task name that need to be ran.
        var slushTasks = Util.generateSlushTasks(taskResults);

        // Final task to create the package.json and bower.json files.
        var packageJsonTask = require('./slush/slushTasks/packageJson')(basePath, answers, taskResults);

        // Run tasks in sequence and parallel.
        runSequence(
            slushTasks,
            packageJsonTask.taskName,
            done
        );
    });

});

//https://github.com/react-fullstack/slush-react-fullstack
//https://github.com/peterjuras/slush-react-express
//https://github.com/arvindr21/slush-meanjs