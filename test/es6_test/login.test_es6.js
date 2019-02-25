var config = require("../../configs/index");
const appConstants = require("../../configs/appConstants");
const { describe, it, after, before } = require('selenium-webdriver/testing');
const driverUtils = require('../../utils/driverutils');
const HomePage = require("../../lib/es6/home_page_es6");
const LoginPage = require("../../lib/es6/login_page_es6");
const HeaderPage = require("../../lib/es6/header_page_es6");
var driver;

describe('Login Feature', function () {
    this.timeout(appConstants.mochaTimeout);

    beforeEach(async function () {
        driver = await driverUtils(process.env.browser);
        driver.manage().window().maximize();
        this.homePage = new HomePage(driver);
        this.loginPage = new LoginPage(driver);
        this.headerPage = new HeaderPage(driver);
    });

    afterEach(function () {
        this.homePage.quit();
    });

    it('Valid Login Test', async function () {
        await this.homePage.navigate();
        await this.homePage.openLoginForm();
        await this.loginPage.login(config().ADMIN_USER, config().ADMIN_PASS);
        await this.headerPage.headerIsPresent();
    });


});


