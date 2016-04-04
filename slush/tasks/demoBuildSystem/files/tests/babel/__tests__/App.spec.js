'use strict';

jest.autoMockOff();

// Imports
const App = require('../src/assets/scripts/App');
const DemoView = require('../src/assets/scripts/views/DemoView');

describe('Application class', () => {

    it('calls init when created', () => {
        // perform the code to be tested
        const app = new App();

        // setup a spy on the App.init method to verify that it was called
        spyOn(app, 'init');

        // setup a spy on the App.init method to verify that it was called
        app.init();

        // test the expectations
        expect(app.init).toHaveBeenCalled();
        expect(app.init.calls.count()).toEqual(1);
    });

    it('creates a demo view', () => {
        // perform the code to be tested
        const app = new App();

        app.init();

        expect(app.demoView instanceof DemoView).toEqual(true);
    });

});
