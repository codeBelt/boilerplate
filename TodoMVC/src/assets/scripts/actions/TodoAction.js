import BaseObject from 'strucutrejs/BaseObject';
import EventBroker from 'strucutrejs/event/EventBroker';

import TodoEvent from '../events/TodoEvent';
/**
 * TODO: YUIDoc_comment
 *
 * @class TodoAction
 * @extends BaseObject
 * @constructor
 **/
class TodoAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method load
     * @public
     */
    load() {
        BeerService
            .getAllBeerModels()
            .then((models) => EventBroker.dispatchEvent(TodoEvent.LOAD, models));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method add
     * @param beerModel {BeerModel}
     * @public
     */
    add(beerModel) {
        BeerService
            .add(beerModel)
            .then((model) => EventBroker.dispatchEvent(TodoEvent.ADD, model));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @public
     */
    update(beerModel) {
        BeerService
            .update(beerModel)
            .then((model) => EventBroker.dispatchEvent(TodoEvent.UPDATE));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method remove
     * @public
     */
    remove(beerId) {
        BeerService
            .delete(beerId)
            .then(EventBroker.dispatchEvent(TodoEvent.REMOVE, beerId));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method clear
     * @public
     */
    clear() {
        EventBroker.dispatchEvent(TodoEvent.CLEAR);
    }
    
}

export default new TodoAction();
