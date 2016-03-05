var Util = function() {};

/**
 * Creates a list of slush tasks that need to be ran from the data passed in.
 *
 * @method generateSlushTasks
 * @param taskResults {any}
 * @return {Array<string>}
 * @static
 */
Util.generateSlushTasks = function(taskResults) {
    var slushTasks =  taskResults.reduce(function (previousValue, currentValue) {
        if (currentValue) {
            return previousValue.concat(currentValue.task);
        }

        return previousValue;
    }, []);

    return slushTasks;
}

/**
 * Creates a list of dev dependencies returned from data passed in.
 *
 * @method generateUniqueDevDependencies
 * @param taskResults {any}
 * @return {Array<string>}
 * @static
 */
Util.generateUniqueDevDependencies = function(taskResults) {
    var devDependencies = taskResults.reduce(function (previousValue, currentValue) {
        if (currentValue && previousValue.indexOf(currentValue.devDependencies) === -1) {
            return previousValue.concat(currentValue.devDependencies);
        }

        return previousValue;
    }, []);

    // Remove duplicates of dev dependencies
    devDependencies = devDependencies.filter(function(item, index, array) {
        return array.indexOf(item) === index;
    });

    return devDependencies.sort();
}

module.exports = Util;