const { describe, it } = require('selenium-webdriver/testing');
const driverUtils = require('../utils/driverutils');
const categoryFactory = require("../utils/dataFactory");
const appConstants = require("../configs/appConstants");
var config = require("../configs/index");
const HomePage = require("../project/home_page_es6");
const LoginPage = require("../project/login_page_es6");
const HeaderPage = require("../project/header_page_es6");
const ItemsPage = require("../project/items_page_es6");
const CategoryPage = require("../project/category_page_es6");
const BookingPage = require("../project/booking_page_es6.js");

var driver;

describe('Book Item item', function () {
    this.timeout(appConstants.mochaTimeout);

    beforeEach(async function () {
        driver = await driverUtils(process.env.browser);
        driver.manage().window().maximize();
        this.homePage = new HomePage(driver);
        this.loginPage = new LoginPage(driver);
        this.headerPage = new HeaderPage(driver);
        this.itemsPage = new ItemsPage(driver);
        this.categoryPage = new CategoryPage(driver);
        this.bookingPage = new BookingPage(driver);
    });

    afterEach(function () {
        // this.homePage.quit();
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
        await this.categoryPage.selectAction(appConstants.categoryActions.addItem);
        await this.categoryPage.createItem("XXHoriZ", "B2B");
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.navigateToCategory("B2B");
        await this.categoryPage.bookItem("XXHoriZ");
        await this.bookingPage.selectYear("2022");
        await this.bookingPage.selectMonth("May");
    });
});




