'use strict';

jest.autoMockOff();

const $ = require('jquery');
const DemoView = require('../../src/assets/scripts/views/DemoView');
const readFileSync = require('fs').readFileSync;

describe('DemoView', () => {
    let $element;
    let demoView;
    let waitDeferred;

    // Set up our document body
    document.body.innerHTML = readFileSync(__dirname + '/demo.html');

    beforeEach(() => {
        waitDeferred = $.Deferred();
        const promise = waitDeferred.promise();

        $element = $('.js-demo');
        demoView = new DemoView($element);

        spyOn(demoView, '_wait').and.returnValue(promise);

    });

    afterEach(() => {
        $element = null;
        demoView = null;
        waitDeferred = null;
    });

    describe('#init', () => {
        // the following unit test is not necessary for 100% code coverage because each of these methods have their
        // own tests, and #init has no logical branching or decision making statements in it.

        // it('calls init, setupHandlers, createChildren, layout, and enable', () => {
        //     spyOn(DemoView.prototype, 'init').and.callThrough();
        //     spyOn(DemoView.prototype, 'setupHandlers').and.callThrough();
        //     spyOn(DemoView.prototype, 'createChildren').and.callThrough();
        //     spyOn(DemoView.prototype, 'layout').and.callThrough();
        //     spyOn(DemoView.prototype, 'enable');

        //     // we need to re-create the demo view because the spies are created after the test started
        //     demoView = new DemoView($element);

        //     expect(DemoView.prototype.init).toHaveBeenCalled();
        //     expect(DemoView.prototype.setupHandlers).toHaveBeenCalled();
        //     expect(DemoView.prototype.createChildren).toHaveBeenCalled();
        //     expect(DemoView.prototype.layout).toHaveBeenCalled();
        //     expect(DemoView.prototype.enable).toHaveBeenCalled();
        // });

        it('is chainable', () => {
            // this method is chainable, so the context is tested to ensure it is demoView
            const context = demoView.init();

            expect(context).toEqual(demoView);
        });
    });

    describe('#setupHandlers', () => {
        it('creates event handlers on each new instance', () => {
            expect(demoView._onClickHandler).toBeDefined();
            expect(demoView._onMouseEnterHandler).toBeDefined();
            expect(demoView._onMouseLeaveHandler).toBeDefined();
        });

        it('is chainable', () => {
            // this method is chainable, so the context is tested to ensure it is demoView
            const context = demoView.setupHandlers();
            expect(context).toEqual(demoView);
        });
    });

    describe('#createChildren', () => {
        it('Has $element and $card properties', () => {
            expect(demoView.$element instanceof $).toEqual(true);
            expect(demoView._$card instanceof $).toEqual(true);
        });

        it('is chainable', () => {
            const context = demoView.createChildren();
            expect(context).toEqual(demoView);
        });
    });

    describe('#layout', () => {
        it('is chainable', () => {
            const context = demoView.layout();
            expect(context).toEqual(demoView);
        });
    });

    describe('#enable', () => {
        it('sets the enabled state and classes', () => {
            // isEnabled
            expect(demoView.isEnabled).toEqual(true);

            // enabled states
            // expect(demoView._$card.hasClass('transition')).toEqual(true);
            // expect(demoView._$card.hasClass('flipped')).toEqual(true);
        });

        // it('sets event handlers on the _$card child element', () => {
        //     // NOTICE: the following test for event handlers utilizes a private method and as such
        //     // is NOT guaranteed to be a stable API in future releases of jQuery.  For now, it is literally the only
        //     // means to test for this sort of thing when using jQuery
        //     const eventsObject = $._data(demoView._$card[0]).events;
        //
        //     expect(eventsObject).toBeTruthy();
        // });

        it('Is not immediately interactive', () => {
            expect(demoView.isInteractive).toEqual(false);
        });

        // it('Is interactive when the promise returned from #wait resolves', () => {
        //     waitDeferred.resolve();
        //     expect(demoView.isInteractive).toEqual(true);
        // });

        it('does nothing if already enabled', () => {
            // wait has been called once, reset the spy and try calling enable again
            demoView._wait.calls.reset();
            demoView.enable();

            expect(demoView._wait).not.toHaveBeenCalled();
        });
    });

    // describe('#onMouseEnter', () => {
    //     it('adds the active class to the _$card child', () => {
    //         demoView.onMouseEnterHandler();
    //
    //         expect(demoView._$card.hasClass('active'));
    //     });
    // });
    //
    // describe('#onMouseLeave', () => {
    //     it ('removes the active class from the _$card child', () => {
    //         demoView.onMouseLeaveHandler();
    //
    //         expect(demoView._$card.hasClass('active')).toEqual(false);
    //     });
    // });
    //
    // describe('#onClick', () => {
    //     it('removes the flipped class from the _$card child', () => {
    //         demoView.onClickHandler();
    //
    //         expect(demoView._$card.hasClass('flipped')).toEqual(false);
    //     });
    // });
    //
    // describe('#disable', () => {
    //     beforeEach(() => {
    //         waitDeferred.resolve();
    //
    //         demoView.disable();
    //     });
    //
    //     it('is not enabled', () => {
    //         expect(demoView.isEnabled).toEqual(false);
    //         expect(demoView.isInteractive).toEqual(false);
    //     });
    //
    //     it('has removed the enabled classes', () => {
    //         expect(demoView._$card.hasClass('initialized')).toEqual(false);
    //         expect(demoView._$card.hasClass('flipped')).toEqual(false);
    //     });
    //
    //     it('has no event handlers', () => {
    //         // NOTICE: the following test for event handlers utilizes a private method and as such
    //         // is NOT guaranteed to be a stable API in future releases of jQuery.  For now, it is literally the only
    //         // means to test for this sort of thing when using jQuery
    //         expect($._data(demoView._$card[0]).events).toEqual(undefined);
    //     });
    //
    //     it('does nothing if called when already disabled', () => {
    //         demoView.disable();
    //         spyOn(demoView, 'setIsInteractive');
    //
    //         demoView.disable();
    //         expect(demoView.setIsInteractive).not.toHaveBeenCalled();
    //     });
    // });
    //
    describe('#removeChildren', () => {
        it ('unsets all child elements', () => {
            demoView.removeChildren();

            expect(demoView._$card).toEqual(null);
        });
    });

    describe('#destroy', () => {
        beforeEach(() => {
            // the disable method is @chainable and so must be called through
            spyOn(demoView, 'disable').and.callThrough();
            spyOn(demoView, 'removeChildren');

            demoView.destroy();
        });

        it('calls #disable and #removeChildren', () => {
            expect(demoView.disable).toHaveBeenCalled();
            expect(demoView.removeChildren).toHaveBeenCalled();
        });
    });

    describe('#wait', () => {
        let tempSetTimeout;
        beforeEach(() => {
            demoView._wait.and.callThrough();

            tempSetTimeout = window.setTimeout;
            window.setTimeout = (callbackFunction) => {
                callbackFunction();
            };
        });

        afterEach(() => {
            window.setTimeout = tempSetTimeout;
            tempSetTimeout = null;
        });

        it('calls setTimeout after returning a promise', () => {
            const promise = demoView._wait(0);
            expect(promise.state()).toEqual('resolved');
        });
    });

});
