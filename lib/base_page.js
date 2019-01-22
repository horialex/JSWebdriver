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

Base.prototype.quit = function () {
    this.driver.quit();
}

Base.prototype.find = function (locator) {
    this.driver.wait(until.elementLocated(locator))
    .then(function(res) {
        return this.driver.findElement(locator);
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

Base.prototype.click = async  function (locator) {
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
         await sleep(1000);
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
Base.prototype.getElementFromListWhereTextIs = async  function(listLocator, text) {
    let _this = this;
    await this.driver.navigate().refresh();
    // await sleep(1000);
   await  _this.driver.wait(until.elementsLocated(listLocator))
    .then(async function () {
        let myElement = null;
        console.log("Last method")
     await _this.driver.findElements(listLocator)
     .then(async function(list){
        list.forEach(async function(elem) {
            // await Base.prototype.waitAndClick.call(_this, elem);
            await elem.getText()
            .then( function(elemText){
                console.log(elemText)
                if (text === elemText) {

                  elem.click();
                }
            })
       })
    });
        return;
})
        
       // await sleep(1000);
        //return ex;
  
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