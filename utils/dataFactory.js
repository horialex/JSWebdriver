let faker = require('faker');
let utils = require("./helper.js");


module.exports = {
    categoryFactory: function () {
        return {
            name: faker.random.words(1)
        }
    },

    itemFactory: function () {
        return {
            name: faker.random.word(1)
        }
    },

    bookingFactory: function () {
        return {
            itemName: "",
            startDate: utils.getDateInFuture(1),
            endDate: utils.getDateInFuture(2)
        }
    }
}