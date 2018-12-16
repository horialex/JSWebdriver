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

    this.login = function(user, password){
        Base.prototype.type.call(this, this.elements.emailInput, user);
        Base.prototype.type.call(this, this.elements.passInput, password);
        Base.prototype.click.call(this, this.elements.signInBtn);
    }

    this.check = function(element){
       let x =  Base.prototype.elementFound.call(this, element);
       x.then(function(res){
        console.log("La nivel de login page " + res);
       })
    }

}
LoginPage.prototype = Object.create(Base.prototype);


module.exports = LoginPage;