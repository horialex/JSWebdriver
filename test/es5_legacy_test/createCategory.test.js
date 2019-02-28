var { describe, it} = require('selenium-webdriver/testing');
var driverUtils = require('../../configs/driverutils');
var constants = require('../../configs/constants');
var categoryFactory = require("../../utils/dataFactory");
var appConstants = require("../../configs/appConstants");

var Home = require("../../lib/es5/home_page");
var LoginPage = require("../../lib/es5/login_page");
var HeaderPage = require("../../lib/es5/header_page");
var ItemsPage = require("../../lib/es5/items_page");
var CategoryPage = require("../../lib/es5/category_page");

var homePage, loginPage, headerPage, itemsPage, categoryPage;
var driver;

describe('Create category', function () {
    this.timeout(constants.mochaTimeout);

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
        await loginPage.login(constants.email, constants.password);
        await headerPage.selectHeaderOption(appConstants.menuItems.items);
        await itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await itemsPage.createCategory(categoryName);
        await itemsPage.navigateToCategory(categoryName);
    });
});




