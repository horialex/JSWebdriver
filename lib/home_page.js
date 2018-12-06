var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");


function Home(driver) {
    Base.call(this, driver);

    this.url = "https://wwtest.evozon.com";
    this.elements = {
        loginBtn: ".sign-in-a"
    };

    this.open = function () {
        Base.prototype.open.call(this, this.url);
    }
    
}
Home.prototype = Object.create(Base.prototype);


module.exports = Home;