const { describe, it } = require('selenium-webdriver/testing');
const driverUtils = require('../../utils/driverutils');
const categoryFactory = require("../../utils/dataFactory");
const appConstants = require("../../configs/appConstants");
var config = require("../../configs/index");
const HomePage = require("../../lib/es6/home_page_es6");
const LoginPage = require("../../lib/es6/login_page_es6");
const HeaderPage = require("../../lib/es6/header_page_es6");
const ItemsPage = require("../../lib/es6/items_page_es6");

var driver;

describe('Create category', function () {
    this.timeout(appConstants.mochaTimeout);

    beforeEach(function () {
        driver = await driverUtils(process.env.browser);
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
        await this.loginPage.login(config().ADMIN_USER, config().ADMIN_PASS);
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await this.itemsPage.createCategory(categoryName);
        await this.itemsPage.navigateToCategory(categoryName);
    });
});




