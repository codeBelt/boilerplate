import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class TodoEvent
 * @extends BaseEvent
 * @constructor
 **/
class TodoEvent extends BaseEvent {

    /**
     * Event to be dispatched when the store needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'BeerEvent.load';

    /**
     * Event to be dispatched when a item needs to be added.
     *
     * @event ADD
     * @type {string}
     * @static
     */
    static ADD = 'BeerEvent.add';

    /**
     * Event to be dispatched when a item needs to be removed.
     *
     * @event REMOVE
     * @type {string}
     * @static
     */
    static REMOVE = 'BeerEvent.remove';

    /**
     * Event to be dispatched when a item needs to be updated.
     *
     * @event UPDATE
     * @type {string}
     * @static
     */
    static UPDATE = 'BeerEvent.update';

    /**
     * Event to be dispatched when store needs to be empty.
     *
     * @event CLEAR
     * @type {string}
     * @static
     */
    static CLEAR = 'BeerEvent.clear';

    constructor(type, bubbles, cancelable, data) {
        super(type, bubbles, cancelable, data);
    }

}

export default TodoEvent;
