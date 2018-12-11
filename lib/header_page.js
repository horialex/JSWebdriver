var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");



function HeaderPage(driver) {
    Base.call(this, driver);

    this.elements = {
        headerMenu: By.css("nav[id='menu'] ul[class='nav navbar-nav views'] li a"),
        header: By.className("navbar-header")
    };

    this.headerIsPresent = function(){
        
    }

    this.selectHeaderOption = function(text){
        Base.prototype.clickOnElementInList.call(this, this.elements.headerMenu, text);
    }
   

    
}
HeaderPage.prototype = Object.create(Base.prototype);


module.exports = HeaderPage;