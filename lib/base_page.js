var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
chrome = require('selenium-webdriver/chrome'),
o = new chrome.Options();
o.addArguments("start-maximized"),
o.addArguments('disable-infobars');


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
    this.driver.wait(until.elementLocated(By.css(locator)), 5000);
    return this.driver.findElement(By.css(locator));
}

Base.prototype.type = function (locator, text) {
    this.driver.wait(until.elementLocated(By.css(locator)), 5000);
    return this.driver.findElement(By.css(locator)).then(function (element) {
        element.sendKeys(text);
    });
}

Base.prototype.click = function (locator) {
    this.driver.wait(until.elementLocated(By.css(locator)), 5000);
    return this.driver.findElement(By.css(locator)).then(function (element) {
        element.click();
    });
}


module.exports = Base;