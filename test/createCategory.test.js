require("chromedriver");
var { describe, it, after, before } = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    chrome = require('selenium-webdriver/chrome'),
    o = new chrome.Options();
    o.addArguments("start-maximized"),
    o.addArguments('disable-infobars');

var utils = require('../utils/constants');
var Home = require("../lib/home_page");
var LoginPage = require("../lib/login_page");
var HeaderPage = require("../lib/header_page");
var ItemsPage = require("../lib/items_page");
var categoryFactory = require("../utils/dataFactory");
var homePage, loginPage, headerPage, itemsPage;
var driver;

describe('Create category', function () {
    this.timeout(999999);

    beforeEach(function () {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();
        homePage = new Home(driver);
        loginPage = new LoginPage(driver);
        headerPage = new HeaderPage(driver);
        itemsPage = new ItemsPage(driver);
        
    });

    afterEach(function () {
        // homePage.quit();
    });

    it('I should be able to ceate a category', async  function () {
        let categoryName = categoryFactory().name;
        await homePage.open();
        console.log("Test 1");
        await homePage.openLoginForm();
        console.log("Test 2");
        await loginPage.login(utils.email, utils.password);
        console.log("Test 3");
        await headerPage.selectHeaderOption('ITEMS');
        console.log("Test 4");
        // headerPage.selectHeaderOption('BOOKINGS');
        // headerPage.selectHeaderOption('ITEMS');
        await itemsPage.selectAction('Add Category');
        console.log("Test 5");
        await itemsPage.createCategory(categoryName);
        console.log("Test 6");
        await itemsPage.categoryIsPresent(categoryName);
        console.log("Test 7");
    });


});




