var NRD = window.NRD || {};

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
