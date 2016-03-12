var <%= jsNamespace %> = window.<%= jsNamespace %> || {};

<%= jsNamespace %>['./App'] = (function() {
    'use strict';


    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        alert('hey');
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        // Create your views here
    };

    return App;

}());
