var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");


function Home(driver) {
    Base.call(this, driver);

    this.url = "https://wwtest.evozon.com";
    this.elements = {
        loginMenu: By.css(".sign-in-a")
    };

    this.open = async function () {
        await Base.prototype.open.call(this, this.url);
        console.log("1");
    }

    this.openLoginForm = async function(){
       await Base.prototype.click.call(this, this.elements.loginMenu);
        console.log("2");
    }
    
}
Home.prototype = Object.create(Base.prototype);


module.exports = Home;