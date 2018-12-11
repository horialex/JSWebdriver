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

Base.prototype.clickOnElementInList = function (listLocator, text) {
    this.driver.wait(until.elementsLocated(listLocator), 5000);
     this.driver.findElements(listLocator).then(function(elements){
         elements.filter(function(el){
            el.getText().then(function(txt){
             if(txt === text){
                el.click();
             }
           });
        }); 
    });
}


module.exports = Base;