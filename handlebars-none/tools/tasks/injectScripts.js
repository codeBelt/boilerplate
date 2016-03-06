/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        // Searches for bower comment blocks (`<!-- bower:js -->`) and injects
        // script tag references to bower modules into markup.
        wiredep: {
            injectScripts: {
                options: {
                    // Replaces relative paths like `../script.js` with `script.js`
                    // This is necessary when the destination is a template in a location
                    // like /templates/footer.html
                    ignorePath: '../',
                    exclude: [/modernizr/],
                    fileTypes: {
                        html: {
                            replace: {
                                js: '<script src="{{filePath}}?v=@@version"></script>'
                            }
                        }
                    }
                },
                src: ['<%= env.DIR_SRC %>/**/*.hbs']
            }
        }
    });

    grunt.registerTask('injectScripts',
        function() {
            grunt.task.run('wiredep:injectScripts');

            grunt.log.ok(
                'Success!\n' +
                'Injected a script tag into your <head> for each library in bower.json'
            );
        }
    );
};
