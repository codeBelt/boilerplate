import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class TodoModel
 * @extends BaseModel
 * @constructor
 **/
class TodoModel extends BaseModel {

    /**
     * @property id
     * @type {string}
     * @public
     */
    id = null;

    /**
     * @property text
     * @type {string}
     * @public
     */
    text = '';

    /**
     * @property isComplete
     * @type {boolean}
     * @public
     */
    isComplete = false;

    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export default TodoModel;
