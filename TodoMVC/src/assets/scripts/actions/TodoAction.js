import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

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
        // TodoService
        //     .getAllTodoModels()
        //     .then((models) => EventBroker.dispatchEvent(TodoEvent.LOAD, models));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method add
     * @param todoModel {TodoModel}
     * @public
     */
    add(todoModel) {
        // TodoService
        //     .add(todoModel)
        //     .then((model) => EventBroker.dispatchEvent(TodoEvent.ADD, model));

        // window.localStorage.setItem(key, data);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @public
     */
    update(todoModel) {
        // TodoService
        //     .update(todoModel)
        //     .then((model) => EventBroker.dispatchEvent(TodoEvent.UPDATE));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method remove
     * @public
     */
    remove(todoId) {
        // TodoService
        //     .delete(todoId)
        //     .then(EventBroker.dispatchEvent(TodoEvent.REMOVE, todoId));
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
