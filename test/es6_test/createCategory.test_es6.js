const { describe, it } = require('selenium-webdriver/testing');
const driverUtils = require('../../configs/driverutils');
const constants = require('../../configs/constants');
const categoryFactory = require("../../utils/dataFactory");
const appConstants = require("../../configs/appConstants");

const HomePage = require("../../lib/es6/home_page_es6");
const LoginPage = require("../../lib/es6/login_page_es6");
const HeaderPage = require("../../lib/es6/header_page_es6");
const ItemsPage = require("../../lib/es6/items_page_es6");

var driver;

describe('Create category', function () {
    this.timeout(constants.mochaTimeout);

    beforeEach(function () {
        driver = driverUtils(process.env.npm_config_env);
        driver.manage().window().maximize();
        this.homePage = new HomePage(driver);
        this.loginPage = new LoginPage(driver);
        this.headerPage = new HeaderPage(driver);
        this.itemsPage = new ItemsPage(driver);
    });

    afterEach(function () {
        this.homePage.quit();
    });

    it('I should be able to ceate a category', async function () {
        let categoryName = categoryFactory().name;
        await this.homePage.navigate();
        await this.homePage.openLoginForm();
        await this.loginPage.login(constants.email, constants.password);
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await this.itemsPage.createCategory(categoryName);
        await this.itemsPage.navigateToCategory(categoryName);
    });
});




