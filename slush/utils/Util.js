'use strict';

const _devDependenciesData = require('../devDependencies.json');
const _bowerDependenciesData = require('../bowerDependencies.json');

/**
 * Utility class for the slush generator and slush tasks.
 *
 * @class Util
 * @extends DOMElement
 * @constructor
 **/
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
     *
     * @method createListFromPropertyName
     * @param taskResults {array}
     * @param propertyName {string}
     * @return {Array<string>}
     * @static
     */
    static createListFromPropertyName(taskResults, propertyName) {
        let list = taskResults.reduce((previousValue, currentValue) => {
            if (currentValue && previousValue.indexOf(currentValue[propertyName]) === -1) {
                return previousValue.concat(currentValue[propertyName]);
            }

            return previousValue;
        }, []);

        return Util.removeDuplicates(list);
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
        const devDependencyList = Util.createListFromPropertyName(taskResults, 'devDependencies');
        const devDependencyHash = {};

        devDependencyList.forEach((item) => {
            devDependencyHash[item] = _devDependenciesData[item];
        });

        return JSON.stringify(devDependencyHash);
    }

    /**
     * Creates a stringify object with the bower dependencies and there version.
     *
     * @method generateBowerDependenciesWithVersions
     * @param taskResults {string}
     * @return {Array<string>}
     * @static
     */
    static generateBowerDependenciesWithVersions(taskResults) {
        const bowerDependencyList = Util.createListFromPropertyName(taskResults, 'bowerDependencies');
        const bowerDependencyHash = {};

        bowerDependencyList.forEach((item) => {
            bowerDependencyHash[item] = _bowerDependenciesData[item];
        });

        return JSON.stringify(bowerDependencyHash);
    }

    /**
     * Remove duplicates out of an array.
     *
     * @method removeDuplicates
     * @static
     */
    static removeDuplicates(list) {
        const results = list.filter((item, index, array) => {
            return array.indexOf(item) === index;
        });

        return results.sort();
    }

    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentence
     * @param str {string}
     * @param [separator] {string} Can be any string you want to use as a separator.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '/');
     *      // 'live/down/by/the/river'
     */
    static toSentence(str, separator) {
        if (separator === void 0) { separator = ' '; }

        return String(str)
            .replace(/(\d)/g, '$1 ')
            .replace(/([a-z](?=[A-Z]))/g, '$1 ')
            .replace(/[^a-zA-Z0-9 ]/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .replace(/^ | $/g, '')
            .toLowerCase()
            .replace(/\s+/g, separator);
    }

}

module.exports = Util;
