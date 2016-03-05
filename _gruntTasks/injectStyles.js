/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        // Searches for bower comment blocks (`<!-- bower:css -->`) and injects
        // script tag references to bower modules into markup.
        wiredep: {
            injectStyles: {
                options: {
                    // Replaces relative paths like `../screen.css` with `screen.css`
                    // This is necessary when the destination is a template in a location
                    // like /templates/footer.html
                    ignorePath: '../',
                    fileTypes: {
                        html: {
                            replace: {
                                css: '<link rel="stylesheet" href="{{filePath}}?v=@@version" />'
                            }
                        }
                    }
                },
                src: ['<%= env.DIR_SRC %>/**/*.html']
            }
        }
    });

    grunt.registerTask('injectStyles',
        function() {
            grunt.task.run('wiredep:injectStyles');

            grunt.log.ok(
                'Success!\n' +
                'Injected a style tag into your <head> for each library in bower.json'
            );
        }
    );
};
