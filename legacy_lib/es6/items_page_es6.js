const BasePage = require("./base_page_es6");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class ItemsPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.elements = {
            createItemsMenu: By.css("div.collection-action-container span[class='add-icon-label']"),
            categoryNameInput: By.id("category-name"),
            createCategoryButton: By.id("save-category"),
            categoriesList: By.css("div[class^='list-container'] > ul > li h3 a")
        }
    }

    async selectAction(action) {
        await this.clickOnElementInList(this.elements.createItemsMenu, action);
    }

    async createCategory(categoryName) {
        await this.type(this.elements.categoryNameInput, categoryName);
        await this.clickOnElement(this.elements.createCategoryButton);
    }

    async navigateToCategory(categoryName) {
        let element = await this.getElementFromList(this.elements.categoriesList, categoryName);
        await this.waitAndClick(element);
    }
}
module.exports = ItemsPage;