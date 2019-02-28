var { describe, it, after, before } = require('selenium-webdriver/testing');
// var webdriver = require('selenium-webdriver');

var driverUtils = require('../../configs/driverutils');
var constants = require('../../configs/constants');
var Home = require("../../lib/es5/home_page");
var LoginPage = require("../../lib/es5/login_page");
var HeaderPage = require("../../lib/es5/header_page");
var homePage, loginPage, headerPage;
var driver;

describe('Login', function () {
    this.timeout(constants.mochaTimeout);

    beforeEach(async function () {
        driver = await driverUtils(process.env.npm_config_env);
        driver.manage().window().maximize();
        homePage = new Home(driver);
        loginPage = new LoginPage(driver);
        headerPage = new HeaderPage(driver);
    });

    afterEach(function () {
        homePage.quit();
    });

    it('Login Test', async function () {
        await homePage.open();
        await homePage.openLoginForm();
        await loginPage.login(constants.email, constants.password);
        await headerPage.headerIsPresent();
    });


});



