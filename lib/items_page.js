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


    this.selectAction = async function(text){
       await Base.prototype.clickOnElementInList.call(this, this.elements.createItemsMenu, text);
    }

    this.createCategory = async  function(categoryName){
      await  Base.prototype.type.call(this, this.elements.categoryNameInput, categoryName);
      await Base.prototype.click.call(this, this.elements.createCategoryButton);
    }


    this.categoryIsPresent = async function(categoryName){
       // let element = await Base.prototype.getElementFromListWhereTextIs.call(this, this.elements.categoriesList, categoryName);
       // await element.getText().should.eventually.equal(categoryName);
        await Base.prototype.getElementFromListWhereTextIs.call(this, this.elements.categoriesList, categoryName);
    }
    
}
ItemsPage.prototype = Object.create(Base.prototype);

module.exports = ItemsPage;