var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");



function ItemsPage(driver) {
    Base.call(this, driver);

    this.elements = {
        createItemsMenu: By.css("div.collection-action-container span[class='add-icon-label']")
      
    };


    this.selectAction = function(text){
        Base.prototype.clickOnElementInList.call(this, this.elements.createItemsMenu, text);
    }
   
    
}
ItemsPage.prototype = Object.create(Base.prototype);

module.exports = ItemsPage;