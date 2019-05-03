const { describe, it } = require('selenium-webdriver/testing');
const driverUtils = require('../utils/driverutils');
const factory = require("../utils/dataFactory");
const appConstants = require("../configs/appConstants");
var config = require("../configs/index");
const HomePage = require("../project/home_page_es6");
const LoginPage = require("../project/login_page_es6");
const HeaderPage = require("../project/header_page_es6");
const ItemsPage = require("../project/items_page_es6");
const CategoryPage = require("../project/category_page_es6");
const BookingPage = require("../project/booking_page_es6.js");
const BookingsPage = require("../project/bookings_page_es6.js");

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
        this.bookingsPage = new BookingsPage(driver);
    });

    afterEach(function () {
        // this.homePage.quit();
    });

    it('I should be able to book an item', async function () {
        let categoryName = factory.categoryFactory().name; 
        let itemName = factory.itemFactory().name; 
        let booking = factory.bookingFactory();
        booking.itemName = itemName;
     
        await this.homePage.navigate();
        await this.homePage.openLoginForm();
        await this.loginPage.login(config().ADMIN_USER, config().ADMIN_PASS);
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.selectAction(appConstants.categoryActions.addCategory);
        await this.itemsPage.createCategory(categoryName);
        await this.itemsPage.navigateToCategory(categoryName);
        await this.categoryPage.selectAction(appConstants.categoryActions.addItem);
        await this.categoryPage.createItem(itemName, categoryName);
        await this.headerPage.selectHeaderOption(appConstants.menuItems.items);
        await this.itemsPage.navigateToCategory(categoryName);
        await this.categoryPage.bookItem(itemName);
        await this.bookingPage.selectStartDate(booking.startDate);
        await this.bookingPage.selectEndDate(booking.endDate);
        await this.bookingPage.confirmBooking();
        await this.headerPage.selectHeaderOption(appConstants.menuItems.bookings);
        await this.bookingsPage.selectBookingsAction(appConstants.bookingActions.myBookings);
        await this.bookingsPage.validateBooking(booking);    
    });
});




