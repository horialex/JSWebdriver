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
            await _this.driver.findElement(locator).then(async function (element) {
                await _this.clickWhenClickable(element);
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

    async getTextFromWebElement(element) {
        let text = await this.driver.findElement(element).getText();
        return text;
    }

    async clickOnElementInList(listLocator, text) {
        var _this = this;
        await _this.sleep(1000);
        await _this.driver.wait(until.elementsLocated(listLocator), 5000).then(async function () {
            await _this.driver.findElements(listLocator).then(async function (elements) {
                await elements.forEach(async function (element) {
                    await element.getText().then(async function (txt) {
                        if (txt.trim() === text.trim()) {
                            await _this.clickWhenClickable(element);
                        }
                    });
                })
            });
        });
    }

  
    async clickWhenClickable(element) {
        let _this = this;
        let contor = 0;
        while(contor < 10){
            await _this.driver.findElement(By.css("div[class='ww-loading']"))
            .then(async function (result) {
            _this.sleep(1000);
            }).catch(async function (error) {
                contor=10;
                await element.click();
                await _this.sleep(100);
            });
            contor++;
        }
    }

    //This method is not common - this is project specific - this is do avoid performing actions when the loading spinner is present
    // When the spinner is present the page is blocked due to executing ajax requests
    async pageInActive() {
        let _this = this;
        let flag = false;
        await _this.driver.findElement(By.css("div[class='ww-loading']"))
            .then(function (result) {
                flag = true;
            }).catch(function (error) {
                flag = false;
            });
        return flag;
    }

    async getElementFromList(listLocator, text) {
        let _this = this;
        return await _this.driver.wait(until.elementsLocated(listLocator)).then(async function () {
            let myElement = null;
            await _this.driver.findElements(listLocator).then(async function (list) {
                list.forEach(async function (elem) {
                    await elem.getText().then(async function (elemText) {
                        if (text.trim() === elemText.trim()) {
                            myElement = elem;
                        }
                    })
                })
            });
            return myElement;
        })
    }

    async getWebElementFromListWhereTextMatches(listLocator, text, textLocator, subElementLocator) {
        let _this = this;
        await _this.driver.navigate().refresh();
        return await _this.driver.wait(until.elementsLocated(listLocator)).then(async function () {
            let myElement = null;
            await _this.driver.findElements(listLocator).then(async function (list) {
                list.forEach(async function (elem) {
                    await elem.findElement(textLocator).getText().then(async function (elemText) {

                        if (text.trim() === elemText.trim()) {

                            myElement = await elem.findElement(subElementLocator);
                        }
                    })
                })
            });
            return myElement;
        })
    }



    async waitForTitle(pageTitle) {
        await this.driver.wait(until.titleContains(pageTitle));
    }

    async scrollToElement(element) {
        await this.driver.executeScript("arguments[0].scrollIntoView()", element);
    }

    async refreshPage() {
        await this.driver.navigate().refresh();
    }



}
module.exports = BasePage;