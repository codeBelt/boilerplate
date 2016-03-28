/*
 * slush-boilerplate
 * https://github.com/codeBelt/slush-boilerplate
 *
 * Copyright (c) 2016, codeBelt
 * Licensed under the MIT license.
 */

'use strict';

// Slush/Gulp Files
const gulp = require('gulp');
const inquirer = require('inquirer');
const runSequence = require('run-sequence').use(gulp);

// Helpers
const Util = require('./slush/utils/Util');

// Slush Tasks
const mainBuildSystem = require('./slush/tasks/mainBuildSystem/index');
const installerSystem = require('./slush/tasks/installerSystem/index');
//const requiredFiles = require('./slush/tasks/requiredFiles');
//const demoBuildSystem = require('./slush/tasks/demoBuildSystem');
//const docsBuildSystem = require('./slush/tasks/docsBuildSystem');
//const markupBuildSystem = require('./slush/tasks/markupBuildSystem');
//const markupFeatures = require('./slush/tasks/markupFeatures');
//const stylesBuildSystem = require('./slush/tasks/stylesBuildSystem');
//const scriptsBuildSystem = require('./slush/tasks/scriptsBuildSystem');
//const scriptsFramework = require('./slush/tasks/scriptsFramework');
//const scriptsLintSystem = require('./slush/tasks/scriptsLintSystem');
//const scriptsAdditional = require('./slush/tasks/scriptsAdditional');
//const stylesFeatures = require('./slush/tasks/stylesFeatures');
//const precompileJst = require('./slush/tasks/precompileJst');
//const testingBuildSystem = require('./slush/tasks/testingBuildSystem');

// Default Slash Tasks
gulp.task('default', (done) => {
    const questions = require('./slush/questions.js');

    // Ask the questions.
    inquirer.prompt(questions, (answers) => {
        if (!answers.moveon) {
            return done();
        }

        // List of all possible slush tasks.
        const basePath = __dirname;

        // List of gulp tasks. Tasks will return 'null' if they don't need to be ran.
        let taskResults = [
            installerSystem(basePath, answers),
            //demoBuildSystem(basePath, answers),
            //docsBuildSystem(basePath, answers),
            //markupBuildSystem(basePath, answers),
            //markupFeatures(basePath, answers),
            //scriptsBuildSystem(basePath, answers),
            //scriptsFramework(basePath, answers),
            //scriptsLintSystem(basePath, answers),
            //scriptsAdditional(basePath, answers),
            //stylesFeatures(basePath, answers),
            //stylesBuildSystem(basePath, answers),
            //precompileJst(basePath, answers),
            //testingBuildSystem(basePath, answers)
        ];

        // Remove all null values in array.
        taskResults = taskResults.filter(Boolean);

        // Gets all the task name that need to be ran.
        const slushTasks = Util.generateSlushTasks(taskResults);

        // Final task to create the package.json and bower.json files.
        const mainBuildSystemTask = mainBuildSystem(basePath, answers, taskResults);

        // Run tasks in sequence and parallel.
        runSequence(
            slushTasks,
            mainBuildSystemTask.taskName,
            done
        );
    });

});
