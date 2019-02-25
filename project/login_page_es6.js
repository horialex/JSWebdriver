const BasePage = require("../common/base_page_es6");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.elements = {
            emailInput: By.css("#email"),
            passInput: By.css("#pass"),
            signInBtn: By.css("input[class^='signin btn']")
        }
    }

    async login(user, password) {
        await this.type(this.elements.emailInput, user);
        await this.type(this.elements.passInput, password);
        await this.clickOnElement(this.elements.signInBtn);
    }
}

module.exports = LoginPage;