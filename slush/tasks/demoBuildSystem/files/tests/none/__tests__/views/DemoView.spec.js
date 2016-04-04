var NRD = window.NRD || {};

NRD['./views/DemoView.spec'] = (function() {
    'use strict';

    describe('DemoView', function() {
        var $ = NRD['jquery'];
        var DemoView = NRD['./views/DemoView'];

        var $element;
        var demoView;
        var waitDeferred;

        // TODO: need a more elegant solution for embedding HTML for unit tests
        beforeEach(function() {
            waitDeferred = $.Deferred();
            var promise = waitDeferred.promise();

            spyOn(DemoView.prototype, 'wait').and.returnValue(promise);

            $element = $(
                '<div>' +
                    '<div class="js-demo">' +
                        '<div class="js-demo-card"></div>' +
                    '</div>' +
                '</div>'
            );

            demoView = new DemoView($element);
        });

        afterEach(function() {
            $element = null;
            demoView = null;
            waitDeferred = null;
        });

        describe('#init', function() {
            // the following unit test is not necessary for 100% code coverage because each of these methods have their
            // own tests, and #init has no logical branching or decision making statements in it.

            // it('calls init, setupHandlers, createChildren, layout, and enable', function() {
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

            it('is chainable', function() {
                // this method is chainable, so the context is tested to ensure it is demoView
                var context = demoView.init();
                expect(context).toEqual(demoView);
            });
        });

        describe('#setupHandlers', function() {
            it('creates event handlers on each new instance', function() {
                expect(demoView.onClickHandler).toBeDefined();
                expect(demoView.onMouseEnterHandler).toBeDefined();
                expect(demoView.onMouseLeaveHandler).toBeDefined();
            });

            it('is chainable', function() {
                // this method is chainable, so the context is tested to ensure it is demoView
                var context = demoView.setupHandlers();
                expect(context).toEqual(demoView);
            });
        });

        describe('#createChildren', function() {
            it('Has $element and $card properties', function() {
                expect(demoView.$element instanceof $).toEqual(true);
                expect(demoView.$card instanceof $).toEqual(true);
            });

            it('is chainable', function() {
                var context = demoView.createChildren();
                expect(context).toEqual(demoView);
            });
        });

        describe('#layout', function() {
            it('is chainable', function() {
                var context = demoView.layout();
                expect(context).toEqual(demoView);
            });
        });

        describe('#enable', function() {
            it('sets the enabled state and classes', function() {
                // isEnabled
                expect(demoView.isEnabled).toEqual(true);

                // enabled states
                expect(demoView.$card.hasClass('transition')).toEqual(true);
                expect(demoView.$card.hasClass('flipped')).toEqual(true);
            });

            it('sets event handlers on the $card child element', function() {
                // NOTICE: the following test for event handlers utilizes a private method and as such
                // is NOT guaranteed to be a stable API in future releases of jQuery.  For now, it is literally the only
                // means to test for this sort of thing when using jQuery
                var eventsObject = $._data(demoView.$card[0]).events;

                expect(eventsObject).toBeTruthy();
            });

            it('Is not immediately interactive', function() {
                expect(demoView.isInteractive).toEqual(false);
            });

            it('Is interactive when the promise returned from #wait resolves', function() {
                waitDeferred.resolve();
                expect(demoView.isInteractive).toEqual(true);
            });

            it('does nothing if already enabled', function() {
                // wait has been called once, reset the spy and try calling enable again
                demoView.wait.calls.reset();
                demoView.enable();

                expect(demoView.wait).not.toHaveBeenCalled();
            });
        });

        describe('#onMouseEnter', function() {
            it('adds the active class to the $card child', function() {
                demoView.onMouseEnterHandler();

                expect(demoView.$card.hasClass('active'));
            });
        });

        describe('#onMouseLeave', function() {
            it ('removes the active class from the $card child', function() {
                demoView.onMouseLeaveHandler();

                expect(demoView.$card.hasClass('active')).toEqual(false);
            });
        });

        describe('#onClick', function() {
            it('removes the flipped class from the $card child', function() {
                demoView.onClickHandler();

                expect(demoView.$card.hasClass('flipped')).toEqual(false);
            });
        });

        describe('#disable', function() {
            beforeEach(function() {
                waitDeferred.resolve();

                demoView.disable();
            });

            it('is not enabled', function() {
                expect(demoView.isEnabled).toEqual(false);
                expect(demoView.isInteractive).toEqual(false);
            });

            it('has removed the enabled classes', function() {
                expect(demoView.$card.hasClass('initialized')).toEqual(false);
                expect(demoView.$card.hasClass('flipped')).toEqual(false);
            });

            it('has no event handlers', function() {
                // NOTICE: the following test for event handlers utilizes a private method and as such
                // is NOT guaranteed to be a stable API in future releases of jQuery.  For now, it is literally the only
                // means to test for this sort of thing when using jQuery
                expect($._data(demoView.$card[0]).events).toEqual(undefined);
            });

            it('does nothing if called when already disabled', function() {
                demoView.disable();
                spyOn(demoView, 'setIsInteractive');

                demoView.disable();
                expect(demoView.setIsInteractive).not.toHaveBeenCalled();
            });
        });

        describe('#removeChildren', function() {
            it ('unsets all child elements', function() {
                demoView.removeChildren();

                expect(demoView.$card).toEqual(null);
            });
        });

        describe('#destroy', function() {
            beforeEach(function() {
                // the disable method is @chainable and so must be called through
                spyOn(demoView, 'disable').and.callThrough();
                spyOn(demoView, 'removeChildren');

                demoView.destroy();
            });

            it('calls #disable and #removeChildren', function() {
                expect(demoView.disable).toHaveBeenCalled();
                expect(demoView.removeChildren).toHaveBeenCalled();
            });
        });

        describe('#wait', function() {
            var tempSetTimeout;
            beforeEach(function() {
                DemoView.prototype.wait.and.callThrough();

                tempSetTimeout = window.setTimeout;
                window.setTimeout = function(callbackFunction) {
                    callbackFunction();
                };
            });

            afterEach(function() {
                window.setTimeout = tempSetTimeout;
                tempSetTimeout = null;
            });

            it('calls setTimeout after returning a promise', function() {
                var promise = demoView.wait(0);
                expect(promise.state()).toEqual('resolved');
            });
        });
    });

}());