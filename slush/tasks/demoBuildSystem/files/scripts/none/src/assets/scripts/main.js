var NRD = window.NRD || {};

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

 http://plaintexttools.github.io/plain-text-table/
 */

(function() {
    'use strict';

    // The only purpose of this file is to kick off your application's top-level
    // controller at the appropriate time. All other code should be written as
    // separate modules in their own files.

    // Require
    var App = NRD['./App'];

    // Initialize
    window.app = new App();

}());
