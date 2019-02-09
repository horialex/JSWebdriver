const BasePage = require("./base_page_es6");
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;


class HeaderPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.elements = {
      headerMenu: By.css("nav[id='menu'] ul[class='nav navbar-nav views'] li a"),
      headerLogo: By.className("navbar-header")
    }
  }

  async headerIsPresent() {
    let headerLogo = await this.find(this.elements.headerLogo);
    await headerLogo.isDisplayed().should.eventually.be.true;
  }

  async selectHeaderOption(option) {
    await this.clickOnElementInList(this.elements.headerMenu, option)
  }
}
module.exports = HeaderPage; F