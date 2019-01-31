const { describe, it, after, before } = require('selenium-webdriver/testing');

const driverUtils = require('../configs/driverutils');
const constants = require('../configs/constants');
const HomePage = require("../lib/home_page_es6");
// var LoginPage = require("../lib/login_page");
// var HeaderPage = require("../lib/header_page");
// var homePage, loginPage, headerPage;
var driver;

describe('Login Feature', function () {
    this.timeout(constants.mochaTimeout);

    beforeEach(async function () {
        driver = await driverUtils(process.env.npm_config_env);
        driver.manage().window().maximize();
        this.homePage = new HomePage(driver);
        // loginPage = new LoginPage(driver);
        // headerPage = new HeaderPage(driver);
    });

    afterEach(function () {
        // homePage.quit();
    });

    it('Valid Login Test', async function () {
        await this.homePage.navigate();
        await this.homePage.openLoginForm();
        // await loginPage.login(constants.email, constants.password);
        // await headerPage.headerIsPresent();
    });


});



