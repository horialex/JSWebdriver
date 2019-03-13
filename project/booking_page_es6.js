const BasePage = require("../common/base_page_es6");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class BookingPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.elements = {
            
            datePickerContainer : By.css("div[class*='picker-open']"),
            startBookingDatePicker: By.css("input[class^='booking_start_date']"),


            endBookingDatePicker: By.css("input[class^='booking_end_date']"),
        }
    }

    async selectStartDate(startDate) {
        await this.selectYear(year);
    }

    async selectYear(year) {
        await this.clickOnElement(this.elements.startBookingDatePicker);
        await this.clickOnElement(By.css("tr[class='pickerHeader'] th[class='picker-switch']"));
        let displayedYear = await this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
        let noOfNext = Number(year) - Number(displayedYear);    
        for(let i = 0; i < noOfNext; i++){
             displayedYear = await this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
             if(displayedYear !== year){
               await this.clickOnElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.next"));
             }
         }
    }

    async selectMonth(month){
        let monthElement = await this.getElementFromList(By.css("div.datepicker-months tbody span"), month);
        await monthElement.click();
    }

    async selectDay(day){
        
    }


}
module.exports = BookingPage;