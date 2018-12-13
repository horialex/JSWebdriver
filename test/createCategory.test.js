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
    var ItemsPage = require("../lib/items_page");
    var homePage, loginPage, headerPage, itemsPage;
    var driver;


 
    describe('Create Category', function(){
        this.timeout(999999);
        
        beforeEach(function(){
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();
            homePage = new Home(driver);
            loginPage = new LoginPage(driver);
            headerPage = new HeaderPage(driver);
            itemsPage = new ItemsPage(driver);

        });

        afterEach(function(){
            // homePage.quit();
        });
        
        it('Create Category test', function(){
            homePage.open();
            homePage.openLoginForm();
            loginPage.login(utils.email, utils.password);
            headerPage.selectHeaderOption("ITEMS");
            itemsPage.selectAction("Add Category");
            itemsPage.createCategory("a");
        });


    });


   
 