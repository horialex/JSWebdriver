const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
chai.use(chaiAsPromised);

class BasePage {
    constructor(driver, waitTimeout = 10000) {
        this.driver = driver;
        this.waitTimeout = waitTimeout;
    }

    async open(path) {
        await this.driver.get(path);
    }

    async quit() {
        await this.driver.quit();
    }

    async clickOnElement(locator) {
        let _this = this;
        await _this.driver.wait(until.elementLocated(locator)).then(async function () {
            return _this.driver.findElement(locator).then(async function (element) {
                await element.click();
            });
        });
    }

    async type(locator, text) {
        let _this = this;
        await _this.driver.wait(until.elementLocated(locator))
            .then(async function () {
                return _this.driver.findElement(locator).then(async function (element) {
                    await element.sendKeys(text);
                });
            });
    }

    async find(locator) {
        let _this = this
        return await _this.driver.wait(until.elementLocated(locator), 5000).then(async function () {
            return await _this.driver.findElement(locator);
        });
    }

    async sleep(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms)
        });
    }

    async clickOnElementInList(listLocator, text) {
        var _this = this;
        await this.driver.wait(until.elementsLocated(listLocator), 5000).then(async function () {
            await _this.driver.findElements(listLocator).then(async function (elements) {
                await elements.forEach(async function (element) {
                    await element.getText().then(async function (txt) {
                        if (txt === text) {
                            _this.waitAndClick(element);
                        }
                    });
                })
            });
        });
    }

    async waitAndClick(element) {
        let _this = this;
        let elementBlocked = true;
        while (elementBlocked) {
            await _this.sleep(500);
            elementBlocked = this.pageActive(_this);
        }
        element.click();
    }

    pageActive() {
        let _this = this;
        _this.driver.findElement(By.css("div[class='ww-loading']"))
            .then(function (result) {
                return true;
            }).catch(function (error) {
                return false;
            });
    }

    async getElementFromList(listLocator, text) {
        let _this = this;
        await _this.driver.navigate().refresh();
        return await _this.driver.wait(until.elementsLocated(listLocator)).then(async function () {
            let myElement = null;
            await _this.driver.findElements(listLocator).then(async function (list) {
                list.forEach(async function (elem) {
                    await elem.getText().then(async function (elemText) {
                        if (text === elemText) {
                            myElement = elem;
                        }
                    })
                })
            });
            return myElement;
        })
    }

    async waitForTitle(pageTitle){
        await this.driver.wait(until.titleContains(pageTitle));
    }

}
module.exports = BasePage;