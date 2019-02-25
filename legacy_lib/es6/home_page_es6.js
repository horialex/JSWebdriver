const BasePage = require("./base_page_es6");
var config = require("../../configs/index");
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.url = config().BASE_URL;
        this.elements = {
            loginMenu: By.css(".sign-in-a")
        };
        this.title = "Where's What"
    }

    async navigate() {
        await this.open(this.url);
        await this.waitForTitle(this.title);
    }

    async openLoginForm() {
        await this.clickOnElement(this.elements.loginMenu);
    }
}
module.exports = HomePage;