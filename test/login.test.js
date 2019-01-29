var { describe, it, after, before } = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var driverUtils = require('../utils/driverutils');
var utils = require('../utils/constants');
var Home = require("../lib/home_page");
var LoginPage = require("../lib/login_page");
var HeaderPage = require("../lib/header_page");
var homePage, loginPage, headerPage;
var driver;

describe('Login', function () {
    this.timeout(utils.mochaTimeout);

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
        await loginPage.login(utils.email, utils.password);
        await headerPage.headerIsPresent();
    });


});



