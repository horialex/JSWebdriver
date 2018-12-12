require("chromedriver");
    var { describe, it, after, before} = require('selenium-webdriver/testing');
    var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    o = new chrome.Options();
    o.addArguments("start-maximized"),
    o.addArguments('disable-infobars');
  
    var utils = require('../utils/constants');
    var Home = require("../lib/home_page");
    var LoginPage = require("../lib/login_page");
    var HeaderPage = require("../lib/header_page");
    var homePage, loginPage, headerPage;
    var driver;


 
    describe('library app scenario', function(){
        this.timeout(999999);
        
        beforeEach(function(){
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();
            homePage = new Home(driver);
            loginPage = new LoginPage(driver);
            headerPage = new HeaderPage(driver);
        });

        afterEach(function(){
            homePage.quit();
        });

        
        it('Login Test', function(){
            homePage.open();
            homePage.openLoginForm();
            loginPage.login(utils.email, utils.password);
            headerPage.headerIsPresent();
            headerPage.selectHeaderOption('ITEMS');
            headerPage.selectHeaderOption('USERS');
        });

        

    });


   
 