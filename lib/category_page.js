var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");

function CategoryPage(driver){
    Base.call(this, driver);

    this.elements = {
        categoryTitle: By.css("span.categoryDetails")
    };


}


CategoryPage.prototype = Object.create(Base.prototype);

module.exports = CategoryPage;