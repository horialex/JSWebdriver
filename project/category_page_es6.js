const BasePage = require("../common/base_page_es6");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class CategoryPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.elements = {
            createItemsMenu: By.css("div.collection-action-container span[class='add-icon-label']"),
            itemNameInput: By.id("item_title"),
            confirmCreateItemButton: By.css("button[class='btn btn-success']"),
            categoriesList: By.css("select[id='item-category-id'] option"),
            categoryListSelectItem: By.css("select[id='item-category-id']"),
            itemsList: By.css("div[class*='item-collection-container'] h3 span a")
        }
    }

    async selectAction(action) {
        await this.clickOnElementInList(this.elements.createItemsMenu, action);
    }

    async createItem(itemName, categoryName) {
        await this.type(this.elements.itemNameInput, itemName);
        await this.clickOnElement(this.elements.categoryListSelectItem)
        await this.clickOnElementInList(this.elements.categoriesList, categoryName);
        await this.clickOnElement(this.elements.confirmCreateItemButton);
    }

    async navigateToItem(categoryName) {
        let element = await this.getElementFromList(this.elements.itemsList, categoryName);
        await this.waitAndClick(element);
    }
}
module.exports = CategoryPage;