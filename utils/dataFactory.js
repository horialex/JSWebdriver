var faker = require('faker');
var categoryFactory = function () {
    return {
        name: faker.random.words(1)
    }
}
module.exports = categoryFactory;