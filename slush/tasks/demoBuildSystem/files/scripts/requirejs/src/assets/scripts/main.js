/*

 ╔══════════════════════════════════════════════════════════════════════════════════════╗
 ║ Naming Convention                                                                    ║
 ╠══════════════════════════════════════════════════════════════════════════════════════╣
 ║ Anytime JavaScript interact with an element. Prepend the selector name with a 'js-'. ║
 ║ - Example: js-someButton                                                             ║
 ║                                                                                      ║
 ║ Name the selector the same name as the view.                                         ║
 ║ - Example: SomeView would have a selector named js-SomeView                          ║
 ╚══════════════════════════════════════════════════════════════════════════════════════╝

 The only purpose of this file is to kick off your application's top-level
 controller at the appropriate time. All other code should be written as
 separate modules in their own files.

 Note that since this is the application entry-point, traditional
 RequireJS syntax is used here to specify dependencies. Do not use this
 syntax in any other modules.

 http://plaintexttools.github.io/plain-text-table/
 */

/**
 * Bootstrap.
 */
require( // jshint ignore:line
    [
        './App'
    ],
    function(
        App
    ) {
        'use strict';


        window.app = new App();
    }
);
