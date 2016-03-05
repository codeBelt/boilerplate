/*jshint node:true */
'use strict';

var path = require('path');
var shell = require('shelljs');

shell.cp('-R',
    path.resolve(__dirname, 'cache/yuidoc-friendly-theme'),
    path.resolve(__dirname, '../node_modules')
);

shell.chmod(770, path.resolve(__dirname, '../build.sh'));
shell.chmod(770, path.resolve(__dirname, 'node-install.sh'));
