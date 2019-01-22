var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;
var Base = require("./base_page");


function LoginPage(driver){
    Base.call(this, driver);

    this.elements = {
        emailInput : By.css("#email"),
        passInput :  By.css("#pass"),
        signInBtn : By.css("input[class^='signin btn']")
    };

    this.login = async function(user, password){
       await Base.prototype.type.call(this, this.elements.emailInput, user);
        await  Base.prototype.type.call(this, this.elements.passInput, password);
        await Base.prototype.click.call(this, this.elements.signInBtn);
        console.log("3");
    }

}
LoginPage.prototype = Object.create(Base.prototype);


module.exports = LoginPage;