/*
 * slush-project
 * https://github.com/codeBelt/slush-project
 *
 * Copyright (c) 2016, codeBelt
 * Licensed under the MIT license.
 */

'use strict';

// Slush/Gulp Files
const gulp = require('gulp');
const inquirer = require('inquirer');
const runSequence = require('run-sequence').use(gulp);
const install = require('gulp-install');

// Helpers
const Util = require('./slush/utils/Util');

// Slush Tasks
const npmJsonBuildSystem = require('./slush/tasks/npmJsonBuildSystem/index');
const mainBuildSystem = require('./slush/tasks/mainBuildSystem/index');
const scriptsBuildSystem = require('./slush/tasks/scriptsBuildSystem/index');
const scriptsFramework = require('./slush/tasks/scriptsFramework/index');
const scriptsLintSystem = require('./slush/tasks/scriptsLintSystem/index');
const scriptsAdditional = require('./slush/tasks/scriptsAdditional/index');
const demoBuildSystem = require('./slush/tasks/demoBuildSystem/index');
const docsBuildSystem = require('./slush/tasks/docsBuildSystem/index');
const markupBuildSystem = require('./slush/tasks/markupBuildSystem/index');
const markupFeatures = require('./slush/tasks/markupFeatures/index');
const stylesFeatures = require('./slush/tasks/stylesFeatures/index');
const stylesBuildSystem = require('./slush/tasks/stylesBuildSystem/index');
const jstBuildSystem = require('./slush/tasks/jstBuildSystem/index');
const testingBuildSystem = require('./slush/tasks/testingBuildSystem/index');
const staticBuildSystem = require('./slush/tasks/staticBuildSystem/index');

// Default Slash Tasks
gulp.task('default', (done) => {
    const questions = require('./slush/questions.js');

    // Ask the questions.
    inquirer.prompt(questions, (answers) => {
        if (!answers.moveon) {
            return done();
        }

        // List of gulp tasks. Tasks will return 'null' if they don't need to be ran.
        let taskResults = [
            mainBuildSystem(answers),
            scriptsBuildSystem(answers),
            scriptsFramework(answers),
            scriptsLintSystem(answers),
            scriptsAdditional(answers),
            demoBuildSystem(answers),
            docsBuildSystem(answers),
            markupBuildSystem(answers),
            markupFeatures(answers),
            stylesFeatures(answers),
            stylesBuildSystem(answers),
            jstBuildSystem(answers),
            staticBuildSystem(answers),
            testingBuildSystem(answers)
        ];

        // Remove all null values in array.
        taskResults = taskResults.filter(Boolean);

        // Gets all the task name that need to be ran.
        const slushTasks = Util.generateSlushTasks(taskResults);

        // Final task to create the package.json and bower.json files.
        const npmJsonBuildSystemTask = npmJsonBuildSystem(answers, taskResults);

        // Run tasks in sequence and parallel.
        runSequence(
            slushTasks,
            npmJsonBuildSystemTask.taskName,
            'install',
            done
        );
    });

});

// Installer
gulp.task('install', (done) => {
    return gulp
        .src(['./package.json'])
        .pipe(install());
});
