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

Base.prototype.clickOnElementInList = function (listLocator, text) {
    var _this = this;
    this.driver.wait(until.elementsLocated(listLocator), 5000).then( async function(){
        await sleep(1000);
            _this.driver.findElements(listLocator).then(function(elements){
            elements.filter(function(el){
                el.getText().then(function(txt){
                if(txt === text){
                    el.click();
                }
            });
            }); 
        });
    });

 Base.prototype.elementIsInList = function(listLocator, text){
    // var _this = this;
    // this.driver.wait(until.elementsLocated(listLocator), 5000).then( async function(){
    //     await sleep(1000);
    //         _this.driver.findElements(listLocator).then(function(elements){
    //         elements.filter(function(el){
    //             el.getText().then(function(txt){
    //             if(txt === text){
    //                 el.click();
    //             }
    //         });
    //         }); 
    //     });
    // });
 }   
   
   
}

function sleep(ms){
    return new Promise(function(resolve){
        setTimeout(resolve,ms)
    });
}


module.exports = Base;