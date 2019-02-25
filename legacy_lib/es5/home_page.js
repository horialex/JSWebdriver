var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page_es6");


function Home(driver) {
    Base.call(this, driver);

    this.url = "https://wwtest.evozon.com";
    this.elements = {
        loginMenu: By.css(".sign-in-a")
    };

    this.open = async function () {
        await Base.prototype.open.call(this, this.url);
    }

    this.openLoginForm = async function(){
       await Base.prototype.click.call(this, this.elements.loginMenu);
    }
    
}
Home.prototype = Object.create(Base.prototype);


module.exports = Home;