define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    {% if jstBuildSystem != 'no' %}
        require('templates'); // jshint ignore:line
    {% endif %}

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
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
        {% if jstBuildSystem != 'no' %}
            var template = window['JST']['templates/jst/GenericModal']();
            console.log(template);
        {% endif %}
    };

    return App;

});
