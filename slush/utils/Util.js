'use strict';

const devDependenciesData = require('../devDependencies.json');

class Util {

    /**
     * Creates a list of slush tasks that need to be ran from the data passed in.
     *
     * @method generateSlushTasks
     * @param taskResults {any}
     * @return {Array<string>}
     * @static
     */
    static generateSlushTasks(taskResults) {
        const slushTasks = taskResults.reduce((previousValue, currentValue) => {
            if (currentValue) {
                return previousValue.concat(currentValue.taskName);
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
    static generateUniqueDevDependencies(taskResults) {
        let devDependencies = taskResults.reduce((previousValue, currentValue) => {
            if (currentValue && previousValue.indexOf(currentValue.devDependencies) === -1) {
                return previousValue.concat(currentValue.devDependencies);
            }

            return previousValue;
        }, []);

        // Remove duplicates of dev dependencies
        devDependencies = devDependencies.filter((item, index, array) => {
            return array.indexOf(item) === index;
        });

        return devDependencies.sort();
    }

    /**
     * Creates a stringify object with the dev dependencies and there version.
     *
     * @method generateDevDependenciesWithVersions
     * @param taskResults {string}
     * @return {Array<string>}
     * @static
     */
    static generateDevDependenciesWithVersions(taskResults) {
        const devDependencyList = Util.generateUniqueDevDependencies(taskResults);
        const devDependencyHash = {};

        devDependencyList.forEach((item) => {
            devDependencyHash[item] = devDependenciesData[item];
        });

        return JSON.stringify(devDependencyHash);
    }

    /**
     *
     * @method generateBowerDependencies
     * @param taskResults {string}
     * @return {Array<string>}
     * @static
     */
    static generateBowerDependencies(taskResults) {
        const results = taskResults.reduce((previousValue, currentValue) => {
            if (currentValue.bowerDependencies.length > 0) {
                return Object.assign(previousValue, ...currentValue.bowerDependencies);
            }

            return previousValue;
        }, {});

        return JSON.stringify(results);
    }

}

module.exports = Util;
