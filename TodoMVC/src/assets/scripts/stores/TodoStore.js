import EventDispatcher from 'structurejs/event/EventDispatcher';
import EventBroker from 'structurejs/event/EventBroker';

import TodoEvent from '../events/TodoEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class TodoStore
 * @extends EventDispatcher
 * @constructor
 **/
class TodoStore extends EventDispatcher {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'BeerStore.changeEvent';

    constructor() {
        super();

        this.enable();
    }

    /**
     * @overridden Collection.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(TodoEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(TodoEvent.ADD, this._onAdd, this);
        EventBroker.addEventListener(TodoEvent.UPDATE, this._onUpdate, this);
        EventBroker.addEventListener(TodoEvent.REMOVE, this._onRemove, this);
        EventBroker.addEventListener(TodoEvent.CLEAR, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden Collection.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(TodoEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(TodoEvent.ADD, this._onAdd, this);
        EventBroker.removeEventListener(TodoEvent.UPDATE, this._onUpdate, this);
        EventBroker.removeEventListener(TodoEvent.REMOVE, this._onRemove, this);
        EventBroker.removeEventListener(TodoEvent.CLEAR, this._onClear, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * Return all active beer models in the store.
     *
     * @method getActiveModels
     * @return {Array<BeerModel>}
     * @public
     */
    getActiveModels() {
        let models = this.models.filter((beerModel) => {
            return beerModel.isActive === true;
        });

        // Sort the beers by there tap order.
        models = models.sort((a, b) => a.tapOrder - b.tapOrder);

        // Need to update the tap order for the models in memory because a new one that is added
        // has a tap order of 99. This makes the models tap orders swappable.
        models.forEach((beerModel, index) => {
            beerModel.tapOrder = index;
        });

        return models;
    }

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<BeerModel>}
     * @public
     */
    getAll() {
        return this.models.slice(0); // Clone array.
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getModelsForFilter
     * @protected
     */
    getModelsForFilter(filterType) {
        let models;

        if (filterType === BeerFilterType.ACTIVE) {
            models = this.getActiveModels();
        } else if (filterType === BeerFilterType.INACTIVE) {
            models = this.models.filter((model) => { return model.isActive === false; });
        } else {
            models = this.getAll();
        }

        return models;
    }

    /**
     * Return the number of models in the store.
     *
     * @method getCount
     * @return {number}
     * @public
     */
    getCount() {
        return this.length;
    }

    /**
     * Return a model by its beerId.
     *
     * @method getBeerModelById
     * @return {BeerModel}
     * @public
     */
    getBeerModelById(beerId) {
        return this.findBy({beerId: beerId})[0];
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateStore
     * @protected
     */
    _updateStore(models) {
        this.add(models);

        this.sortOn('company');

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoad
     * @param event {TodoEvent}
     * @protected
     */
    _onLoad(event) {
        this.clear();

        const beerModel = event.data;

        this._updateStore(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdd
     * @protected
     */
    _onAdd(event) {
        const beerModel = event.data;

        this._updateStore(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdate
     * @protected
     */
    _onUpdate(event) {
        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onRemove
     * @protected
     */
    _onRemove(event) {
        const beerId = event.data;
        const beerModel = this.findBy({beerId: beerId});

        this.remove(beerModel);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClear
     * @protected
     */
    _onClear(event) {
        this.clear();

        this.dispatchEvent(this.CHANGE_EVENT);
    }

}

export default new TodoStore();
