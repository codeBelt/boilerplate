define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

    /**
     * A sample view script. Reveals a message using a card-flip animation.
     *
     * @class DemoView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     */
    var DemoView = function($element) {
        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property $element
         * @type {jQuery}
         * @public
         */
        this.$element = $element;

        /**
         * A reference to the card element.
         *
         * @default null
         * @property $card
         * @type {jQuery}
         * @private
         */
        this.$card = null;

        /**
         * Tracks whether component is enabled.
         *
         * @default false
         * @property isEnabled
         * @type {bool}
         * @public
         */
        this.isEnabled = false;

        /**
         * Tracks whether user interactivity is enabled
         *
         * @default false
         * @property isInteractive
         * @type {bool}
         * @public
         */
        this.isInteractive = false;

        this.init();
    };

    var proto = DemoView.prototype;

    /**
     * Initializes the UI Component View.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @returns {DemoView}
     * @private
     */
    proto.init = function() {
        this.setupHandlers()
           .createChildren()
           .layout()
           .enable();

        return this;
    };

    /**
     * Binds the scope of any handler functions.
     * Should only be run on initialization of the view.
     *
     * @method setupHandlers
     * @returns {DemoView}
     * @private
     */
    proto.setupHandlers = function() {
        // Bind event handlers scope here
        this.onClickHandler = this.onClick.bind(this);
        this.onMouseEnterHandler = this.onMouseEnter.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeave.bind(this);

        return this;
    };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {DemoView}
     * @private
     */
    proto.createChildren = function() {
        this.$card = this.$element.find('.js-demo-card');

        return this;
    };

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {DemoView}
     * @public
     */
    proto.removeChildren = function() {
        this.$card = null;

        return this;
    };

    /**
     * Performs measurements and applys any positioning style logic.
     * Should be run anytime the parent layout changes.
     *
     * @method layout
     * @returns {DemoView}
     * @public
     */
    proto.layout = function() {
        return this;
    };

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @returns {DemoView}
     * @public
     */
    proto.enable = function() {
        if (this.isEnabled) {
            return this;
        }
        this.isEnabled = true;

        this.$card
            .on('click', this.onClickHandler)
            .on('mouseenter', this.onMouseEnterHandler)
            .on('mouseleave', this.onMouseLeaveHandler);

        this.$card
            .addClass('transition')
            .addClass('flipped');

        this.wait(500)
            .then(this.setIsInteractive.bind(this, true));

        return this;
    };

    /**
     * Disables the component.
     * Tears down any event binding to handlers.
     * Exits early if it is already disabled.
     *
     * @method disable
     * @returns {DemoView}
     * @public
     */
    proto.disable = function() {
        if (!this.isEnabled) {
            return this;
        }
        this.isEnabled = false;

        this.$card
            .off('click', this.onClickHandler)
            .off('mouseenter', this.onMouseEnterHandler)
            .off('mouseleave', this.onMouseLeaveHandler);

        this.$card
            .removeClass('initialized')
            .removeClass('flipped');

        this.setIsInteractive(false);

        return this;
    };

    /**
     * Destroys the component.
     * Tears down any events, handlers, elements.
     * Should be called when the object should be left unused.
     *
     * @method destroy
     * @returns {DemoView}
     * @public
     */
    proto.destroy = function() {
        this.disable()
            .removeChildren();

        return this;
    };

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * onClick handler.
     * Alters color upon click of the element.
     *
     * @method onClick
     * @param event {Event} JavaScript event object.
     * @private
     */
    proto.onClick = function(event) {
        this.$card.toggleClass('flipped');
    };

    /**
     * onMouseEnter handler.
     * Alters background color upon mouse enter of the element.
     *
     * @method onMouseEnter
     * @param event {Event} JavaScript event object.
     * @private
     */
    proto.onMouseEnter = function(event) {
        this.$card.addClass('active');
    };

    /**
     * onMouseLeave handler.
     * Alters background color upon mouse leave of the element.
     *
     * @method onMouseLeave
     * @param event {Event} JavaScript event object.
     * @private
     */
    proto.onMouseLeave = function(event) {
        this.$card.removeClass('active');
    };

    //////////////////////////////////////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Sets whether user interactivity is enabled for this component
     *
     * @method wait
     * @param value {bool} True to enable interactivity
     */
    proto.setIsInteractive = function(value) {
        this.isInteractive = value;
    };

    /**
     * Waits for the defined number of milliseconds.
     *
     * @method wait
     * @param millisecondsToWait {int} Number of milliseconds to delay
     * @returns {jQuery.deferred}
     */
    proto.wait = function(millisecondsToWait) {
        var deferred = $.Deferred();

        window.setTimeout(function() {
            deferred.resolve();
        }, millisecondsToWait);

        return deferred.promise();
    };

    return DemoView;

});