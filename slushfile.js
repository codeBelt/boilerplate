/*
 * slush-boilerplate
 * https://github.com/codeBelt/slush-boilerplate
 *
 * Copyright (c) 2016, codeBelt
 * Licensed under the MIT license.
 */

'use strict';

// Slush/Gulp Files
var gulp = require('gulp');
var inquirer = require('inquirer');
var runSequence = require('run-sequence').use(gulp);

// Helpers
var Util = require('./slush/utils/Util');

// Slush Tasks
var requiredFiles = require('./slush/tasks/requiredFiles');
var docsBuildSystem = require('./slush/tasks/docsBuildSystem');
var markupBuildSystem = require('./slush/tasks/markupBuildSystem');
var markupFeatures = require('./slush/tasks/markupFeatures');
var stylesBuildSystem = require('./slush/tasks/stylesBuildSystem');
var scriptsBuildSystem = require('./slush/tasks/scriptsBuildSystem');
var scriptsFramework = require('./slush/tasks/scriptsFramework');
var scriptsAdditional = require('./slush/tasks/scriptsAdditional');
var stylesFeatures = require('./slush/tasks/stylesFeatures');
var precompileJst = require('./slush/tasks/precompileJst');
var packageJson = require('./slush/tasks/packageJson');

// Default Slash Tasks
gulp.task('default', function(done) {
    var questions = require('./slush/questions.js');

    // Ask the questions.
    inquirer.prompt(questions, function(answers) {
        if (!answers.moveon) {
            return done();
        }

        // List of all possible slush tasks.
        var basePath = __dirname;

        // List of gulp tasks. Tasks will return 'null' if they don't need to be ran.
        var taskResults = [
            requiredFiles(basePath, answers),
            docsBuildSystem(basePath, answers),
            markupBuildSystem(basePath, answers),
            markupFeatures(basePath, answers),
            scriptsBuildSystem(basePath, answers),
            scriptsFramework(basePath, answers),
            scriptsAdditional(basePath, answers),
            stylesFeatures(basePath, answers),
            stylesBuildSystem(basePath, answers),
            precompileJst(basePath, answers)
        ];

        // Remove all null values in array.
        taskResults = taskResults.filter(Boolean);

        // Gets all the task name that need to be ran.
        var slushTasks = Util.generateSlushTasks(taskResults);

        // Final task to create the package.json and bower.json files.
        var packageJsonTask = packageJson(basePath, answers, taskResults);

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
