const BasePage = require("../common/base_page_es6");
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class BookingPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.elements = {

            datePickerContainer: By.css("div[class*='picker-open']"),
            startBookingDatePicker: By.css("input[class^='booking_start_date']"),
            endBookingDatePicker: By.css("input[id='booking_start_date2']"),
            saveBookingButton: By.css("button[id='create-booking-action']")
        }
    }

    async selectStartDate(startDate) {
        let year = startDate.split(",")[0].split(" ")[2];
        let month = startDate.split(",")[0].split(" ")[0];
        let day = startDate.split(",")[0].split(" ")[1];
        await this.clickOnElement(this.elements.startBookingDatePicker);
        await this.selectYear(year);
        await this.selectMonth(month)
        await this.selectDay(day);
    }

    async selectEndDate(endDate) {
        let year = endDate.split(",")[0].split(" ")[2];
        let month = endDate.split(",")[0].split(" ")[0];
        let day = endDate.split(",")[0].split(" ")[1];
        await this.clickOnElement(this.elements.endBookingDatePicker);
        await this.selectYear(year);
        await this.selectMonth(month)
        await this.selectDay(day);
    }

    async selectYear(year) {
        await this.clickOnElement(By.css("div[class*='picker-open'] div.datepicker-days thead th.picker-switch"));
        let displayedYear = await this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
        let noOfNext = Number(year) - Number(displayedYear);
        for (let i = 0; i < noOfNext; i++) {
            displayedYear = await this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
            if (displayedYear !== year) {
                await this.clickOnElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.next"));
            }
        }
    }

    async selectMonth(month) {
        let m = await this.getElementFromList(By.css("div[class*='picker-open'] div.datepicker-months tbody span"), month);
        await m.click();
    }


    async selectDay(day) {
        let d = await this.getElementFromList(By.css("div[class*='picker-open'] div.datepicker-days tbody tr td[class*='day']"), day);
        d.click();
    }

    async confirmBooking() {
        await this.clickOnElement(this.elements.saveBookingButton);
    }


}
module.exports = BookingPage;