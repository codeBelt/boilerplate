import DemoView from './views/DemoView';

/**
 * Initial application setup. Runs once upon every page load.
 *
 * @class App
 * @constructor
 */
class App {

    constructor() {
    }

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @public
     */
    init() {
        // Create your views here
        // Pass in a jQuery reference to DOM elements that need functionality attached to them
        this.demoView = new DemoView($('.js-demoView'));
    }

}

export default App;
