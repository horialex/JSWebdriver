var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
chrome = require('selenium-webdriver/chrome'),
    o = new chrome.Options();
o.addArguments("start-maximized"),
    o.addArguments('disable-infobars');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
chai.use(chaiAsPromised);

function Base(driver) {
    this.driver = driver;
}

Base.prototype.open = function (path) {
    this.driver.get(path);
}

Base.prototype.quit = function () {
    this.driver.quit();
}

Base.prototype.find = function (locator) {
    this.driver.wait(until.elementLocated(locator), 5000);
    return this.driver.findElement(locator);
}

Base.prototype.type = function (locator, text) {
    this.driver.wait(until.elementLocated(locator), 5000);
    return this.driver.findElement(locator).then(function (element) {
        element.sendKeys(text);
    });
}

Base.prototype.click = function (locator) {
    this.driver.wait(until.elementLocated(locator), 5000);
    return this.driver.findElement(locator).then(function (element) {
        element.click();
    });
}

Base.prototype.waitAndClick = async function (element) {
    let _this = this;
    let elementBlocked = true;
    while (elementBlocked) {
        await sleep(500);
        elementBlocked = await pageActive(_this);
    }
    element.click();

}

Base.prototype.clickOnElementInList = function (listLocator, text) {
    var _this = this;
    this.driver.wait(until.elementsLocated(listLocator), 5000).then(function () {
        _this.driver.findElements(listLocator).then(function (elements) {
            elements.forEach(function (element) {
                element.getText().then(async function (txt) {
                    if (txt === text) {
                        await Base.prototype.waitAndClick.call(_this, element);
                    }

                });
            })
        });
    });
}

//TO DO
Base.prototype.getElementFromList = function (listLocator) {
    let _this = this;
    _this.driver.wait(until.elementsLocated(listLocator), 5000).then (async function(result){
        await sleep(2000);
        _this.driver.findElements(listLocator).then(function(elements){
            elements.forEach(function(element){
                element.getText().then(function(txt){
                    console.log("Text is " + txt);
                });
            });
        });
    });
   
}

function pageActive(context) {
    let _this = context;
    return _this.driver.findElement(By.css("div[class='ww-loading']")).then(function (result) {
        return true;
    }).catch(function (error) {
        return false;
    });
}

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    });
}


module.exports = Base;