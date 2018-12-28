var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var Base = require("./base_page");



function ItemsPage(driver) {
    Base.call(this, driver);

    this.elements = {
        createItemsMenu: By.css("div.collection-action-container span[class='add-icon-label']"),
        categoryNameInput: By.id("category-name"),
        createCategoryButton: By.id("save-category"),
        categoriesList: By.css("div[class^='list-container'] > ul > li h3 a")
    };


    this.selectAction = function(text){
        Base.prototype.clickOnElementInList.call(this, this.elements.createItemsMenu, text);
    }

    this.createCategory = function(categoryName){
        Base.prototype.type.call(this, this.elements.categoryNameInput, categoryName);
        Base.prototype.click.call(this, this.elements.createCategoryButton);
    }

    //TO DO
    this.categoryIsPresent = async function(){
       let element = await Base.prototype.getElementFromList.call(this, this.elements.categoriesList); 
       element.getText().then(function(txt){
           console.log("Textul este " + txt);
       });
    }
    
}
ItemsPage.prototype = Object.create(Base.prototype);

module.exports = ItemsPage;