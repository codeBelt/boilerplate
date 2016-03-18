
/**
 * A sample view script. Reveals a message using a card-flip animation.
 *
 * @class DemoView
 * @param {jQuery} $element A reference to the containing DOM element.
 * @constructor
 */
class DemoView {

    /**
     * A reference to the card element.
     *
     * @default null
     * @property _$card
     * @type {jQuery}
     * @private
     */
    _$card = null;

    _onClickHandler = null;
    _onMouseEnterHandler = null;
    _onMouseLeaveHandler = null;

    /**
     * A reference to the containing DOM element.
     *
     * @default null
     * @property $element
     * @type {jQuery}
     * @public
     */
    $element = null;

    /**
     * Tracks whether component is enabled.
     *
     * @default false
     * @property isEnabled
     * @type {bool}
     * @public
     */
    isEnabled = false;

    /**
     * Tracks whether user interactivity is enabled
     *
     * @default false
     * @property isInteractive
     * @type {bool}
     * @public
     */
    isInteractive = false;

    constructor($element) {
        this.$element = $element;

        this.init();
    }

    /**
     * Initializes the UI Component View.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @returns {DemoView}
     * @protected
     */
    init() {
        this.setupHandlers()
            .createChildren()
            .layout()
            .enable();

        return this;
    }

    /**
     * Binds the scope of any handler functions.
     * Should only be run on initialization of the view.
     *
     * @method setupHandlers
     * @returns {DemoView}
     * @protected
     */
    setupHandlers() {
        // Bind event handlers scope here
        this._onClickHandler = this._onClick.bind(this);
        this._onMouseEnterHandler = this._onMouseEnter.bind(this);
        this._onMouseLeaveHandler = this._onMouseLeave.bind(this);

        return this;
    }

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {DemoView}
     * @protected
     */
    createChildren() {
        this._$card = this.$element.find('.js-demoView-card');

        return this;
    }

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {DemoView}
     * @public
     */
    removeChildren() {
        this._$card = null;

        return this;
    }

    /**
     * Performs measurements and applys any positioning style logic.
     * Should be run anytime the parent layout changes.
     *
     * @method layout
     * @returns {DemoView}
     * @public
     */
    layout() {
        return this;
    }

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @returns {DemoView}
     * @public
     */
    enable() {
        if (this.isEnabled) {
            return this;
        }
        this.isEnabled = true;

        this._$card
            .on('click', this._onClickHandler)
            .on('mouseenter', this._onMouseEnterHandler)
            .on('mouseleave', this._onMouseLeaveHandler);

        this._$card
            .addClass('transition')
            .addClass('flipped');

        this._wait(500)
            .then(this._setIsInteractive.bind(this, true));

        return this;
    }

    /**
     * Disables the component.
     * Tears down any event binding to handlers.
     * Exits early if it is already disabled.
     *
     * @method disable
     * @returns {DemoView}
     * @public
     */
    disable() {
        if (!this.isEnabled) {
            return this;
        }
        this.isEnabled = false;

        this._$card
            .off('click', this._onClickHandler)
            .off('mouseenter', this._onMouseEnterHandler)
            .off('mouseleave', this._onMouseLeaveHandler);

        this._$card
            .removeClass('initialized')
            .removeClass('flipped');

        this._setIsInteractive(false);

        return this;
    }

    /**
     * Destroys the component.
     * Tears down any events, handlers, elements.
     * Should be called when the object should be left unused.
     *
     * @method destroy
     * @returns {DemoView}
     * @public
     */
    destroy() {
        this.disable()
            .removeChildren();

        return this;
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Sets whether user interactivity is enabled for this component
     *
     * @method _setIsInteractive
     * @param value {bool} True to enable interactivity
     * @protected
     */
    _setIsInteractive(value) {
        this.isInteractive = value;
    }

    /**
     * Waits for the defined number of milliseconds.
     *
     * @method _wait
     * @param millisecondsToWait {int} Number of milliseconds to delay
     * @returns {jQuery.deferred}
     * @protected
     */
    _wait(millisecondsToWait) {
        var deferred = $.Deferred();

        window.setTimeout(function() {
            deferred.resolve();
        }, millisecondsToWait);

        return deferred.promise();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * _onClick handler.
     * Alters color upon click of the element.
     *
     * @method _onClick
     * @param event {Event} JavaScript event object.
     * @private
     */
    _onClick(event) {
        this._$card.toggleClass('flipped');
    }

    /**
     * _onMouseEnter handler.
     * Alters background color upon mouse enter of the element.
     *
     * @method _onMouseEnter
     * @param event {Event} JavaScript event object.
     * @private
     */
    _onMouseEnter(event) {
        this._$card.addClass('active');
    }

    /**
     * _onMouseLeave handler.
     * Alters background color upon mouse leave of the element.
     *
     * @method _onMouseLeave
     * @param event {Event} JavaScript event object.
     * @private
     */
    _onMouseLeave(event) {
        this._$card.removeClass('active');
    }

}

export default DemoView;
