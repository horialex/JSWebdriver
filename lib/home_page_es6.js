const Base = require("./base_page_es6");
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class HomePage extends Base {
    constructor(driver) {
        super(driver);
        this.url = "https://wwtest.evozon.com";
        this.elements = {
            loginMenu: By.css(".sign-in-a")
        }
    }

    async navigate() {
        await this.open(this.url);
    }

    async openLoginForm() {
        await this.clickOnElement(this.elements.loginMenu);
    }
}
module.exports = HomePage;