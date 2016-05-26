'use strict';

/*
 ╔═══════════════════════════════════════════════════════════════════════╗
 ║ JSON Server with faker.js                                             ║
 ╟───────────────────────────────────────────────────────────────────────╢
 ║ https://github.com/typicode/json-server                               ║
 ║ https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server ║
 ║                                                                       ║
 ║ https://github.com/marak/Faker.js                                     ║
 ║ http://marak.com/faker.js/                                            ║
 ╚═══════════════════════════════════════════════════════════════════════╝
 */

const faker = require('faker');
const _ = require('lodash');

/**
 * Models
 */
const _locationMode = (num) => {
    return {
        id: num,
        address1: faker.address.streetAddress(),
        address2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipPostalCode: faker.address.zipCode()
    }
};

const _exampleModel = (num) => {
    return {
        id: num,
        nameFirst: faker.name.firstName(),
        nameLast: faker.name.lastName(),
        email: faker.internet.email(),
        phonePrimary: faker.phone.phoneNumber(),
        phoneSecondary: faker.phone.phoneNumber(),
        locations: _locationMode(1)
    }
};

/**
 * Mock Data API
 */
const fakeData = {
    // Static data api example. Returns a single object.
    static: {
        id: 1,
        title: 'json-server',
        description: 'typicode'
    },

    // Generated data api example. Returns an array of 20 objects.
    generated: _.times(20, (num) => _exampleModel(num))
};

module.exports = fakeData;
