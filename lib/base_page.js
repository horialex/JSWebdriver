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

 Base.prototype.open = async  function (path) {
    await this.driver.get(path);
}

Base.prototype.quit = async function () {
   await this.driver.quit();
}


Base.prototype.find = async function (locator) {
     let _this = this
     await sleep(500);
    return  await _this.driver.wait(until.elementLocated(locator), 5000).then(async function(){
        return await _this.driver.findElement(locator);
  });
    
}

     

Base.prototype.type = async function (locator, text) {
    let _this = this;
   await _this.driver.wait(until.elementLocated(locator))
    .then(async function(res){
        return _this.driver.findElement(locator).then(async function (element) {
       await element.sendKeys(text);
    });
});
}

Base.prototype.click = async function (locator) {
    let _this = this;
    await _this.driver.wait(until.elementLocated(locator))
    .then(async function() {
        return _this.driver.findElement(locator).then(async function (element) {
            await element.click();
    });
});
}


Base.prototype.waitAndClick = async function (element) {
    let _this = this;
    let elementBlocked = true;
    while (elementBlocked) {
         await sleep(500);
        elementBlocked =  pageActive(_this);
    }
     element.click();

}


Base.prototype.clickOnElementInList = async function (listLocator, text) {
    var _this = this;
    await this.driver.wait(until.elementsLocated(listLocator), 5000).then(async function () {
       await _this.driver.findElements(listLocator).then(async function (elements) {
            await elements.forEach(async function (element) {
                await element.getText().then(async function (txt) {
                    if (txt === text) {
                         Base.prototype.waitAndClick.call(_this, element);
                    }
                });
            })
        });
    });
}

//TO IMPROVE
Base.prototype.getElementFromList = async  function(listLocator, text) {
    let _this = this;
    await _this.driver.navigate().refresh();
    return await  _this.driver.wait(until.elementsLocated(listLocator)) .then(async function () {
    let myElement = null;
    await _this.driver.findElements(listLocator).then(async function(list){
        list.forEach(async function(elem) {
        await elem.getText().then(async function(elemText){
                if (text === elemText) {
                     myElement = elem;
                }
            })
       })
    });
    return myElement;
}) 
}

 function pageActive(context) {
    let _this = context;
    _this.driver.findElement(By.css("div[class='ww-loading']"))
    .then( function (result) {
        return true;
    }).catch( function (error) {
        return false;
    });
}

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    });
}


module.exports = Base;