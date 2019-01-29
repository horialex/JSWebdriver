var { describe, it, after, before } = require('selenium-webdriver/testing');
var driverUtils = require('../utils/driverutils');
var utils = require('../utils/constants');
var categoryFactory = require("../utils/dataFactory");
var appConstants = require("../utils/appConstants");

var Home = require("../lib/home_page");
var LoginPage = require("../lib/login_page");
var HeaderPage = require("../lib/header_page");
var ItemsPage = require("../lib/items_page");
var CategoryPage = require("../lib/category_page");

var homePage, loginPage, headerPage, itemsPage, categoryPage;
var driver;

describe('Create category', function () {
    this.timeout(utils.mochaTimeout);

    beforeEach( function () {
        driver =  driverUtils(process.env.npm_config_env);
        driver.manage().window().maximize();
        homePage = new Home(driver);
        loginPage = new LoginPage(driver);
        headerPage = new HeaderPage(driver);
        itemsPage = new ItemsPage(driver);
        categoryPage = new CategoryPage(driver);
    });

    afterEach( function () {
        homePage.quit();
    });

    it('I should be able to ceate a category', async  function () {
        let categoryName = categoryFactory().name;
        await homePage.open();
        await homePage.openLoginForm();
        await loginPage.login(utils.email, utils.password);
        await headerPage.selectHeaderOption(appConstants.menuItems.items);
        await itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await itemsPage.createCategory(categoryName);
        await itemsPage.navigateToCategory(categoryName);
    });
});




