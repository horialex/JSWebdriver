const { describe, it} = require('selenium-webdriver/testing');
const driverUtils = require('../configs/driverutils');
const constants = require('../configs/constants');
const categoryFactory = require("../utils/dataFactory");
const appConstants = require("../configs/appConstants");

const HomePage = require("../lib/home_page_es6");
const LoginPage = require("../lib/login_page_es6");
const HeaderPage = require("../lib/header_page_es6");
const ItemsPage = require("../lib/items_page_es6");
const CategoryPage = require("../lib/category_page_es6");

var driver;

describe('Create category', function () {
    this.timeout(constants.mochaTimeout);

    beforeEach( function () {
        driver =  driverUtils(process.env.npm_config_env);
        driver.manage().window().maximize();
        this.homePage = new Home(driver);
        this.loginPage = new LoginPage(driver);
        this.headerPage = new HeaderPage(driver);
        this.itemsPage = new ItemsPage(driver);
        this.categoryPage = new CategoryPage(driver);
    });

    afterEach( function () {
        // this.homePage.quit();
    });

    it('I should be able to ceate a category', async  function () {
        let categoryName = categoryFactory().name;
        await this.homePage.open();
        await this.homePage.openLoginForm();
        await this.loginPage.login(constants.email, constants.password);
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await this.itemsPage.createCategory(categoryName);
        await this.itemsPage.navigateToCategory(categoryName);
    });
});




