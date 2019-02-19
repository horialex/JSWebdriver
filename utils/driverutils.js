require("chromedriver");
require('geckodriver');

var webdriver = require('selenium-webdriver'),
chrome = require('selenium-webdriver/chrome'),
firefox = require('selenium-webdriver/firefox');
var o;

 var driverUtils = function getDriver(browser) {
    var browsername = browser == undefined ? 'chrome' : browser;
    switch (browsername.toUpperCase()) {
        case 'FIREFOX':
            return  new webdriver.Builder().forBrowser('firefox').build();
        case 'CHROME':
            o = new chrome.Options();
            o.addArguments("start-maximized"),
            o.addArguments('disable-infobars');
            return  new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();
        case 'IE':
            return new Builder().forBrowser('internet explorer').build();
        case 'EDGE':
            return new Builder().forBrowser('MicrosoftEdge').build();
        case 'OPERA':
            return new Builder().forBrowser('opera').build();
        default:
            console.log("The browser is not valid!")
    }
};

module.exports = driverUtils;