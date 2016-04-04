define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    describe('Application class', function() {

        var App = require('./App');
    
        var DemoView = require('./views/DemoView');
    
        it('calls init when created', function() {
            // setup a spy on the App.init method to veryify that it was called
            spyOn(App.prototype, 'init');

            // perform the code to be tested
            var app = new App();

            // test the expectations
            expect(App.prototype.init).toHaveBeenCalled();

            expect(App.prototype.init.calls.count()).toEqual(1);
        });
    
        it('creates a demo view', function() {
            // perform the code to be tested
            var app = new App();

            expect(app.demoView instanceof DemoView).toEqual(true);
        });
    
    });

});