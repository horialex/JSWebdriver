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

    async openStartDatePicker(){
        let _this = this;  
        await _this.sleep(500);
        console.log("Intra in booking start Date");
        await _this.clickOnElement(_this.elements.startBookingDatePicker);
        console.log("Dupa ce intra in booking start Date");
    }

    async openEndDatePicker(){
        let _this = this;  
        console.log("Intra in booking start Date");
        await _this.sleep(500);
        await _this.clickOnElement(_this.elements.endBookingDatePicker);
        console.log("Dupa ce intra in booking start Date");
    }

    async selectStartDate(startDate) {
        let _this = this;
        let year = startDate.split(",")[0].split(" ")[2];
        let month = startDate.split(",")[0].split(" ")[0];
        let day = startDate.split(",")[0].split(" ")[1];
      
        await _this.selectYear(year);
        await _this.selectMonth(month)
        await _this.selectDay(day);
    }

    async selectEndDate(endDate) {
        let year = endDate.split(",")[0].split(" ")[2];
        let month = endDate.split(",")[0].split(" ")[0];
        let day = endDate.split(",")[0].split(" ")[1];
      
        await this.selectYear(year);
        await this.selectMonth(month)
        await this.selectDay(day);
    }

    async selectYear(year) {
        let _this = this;
        await _this.clickOnElement(By.css("div[class*='picker-open'] div.datepicker-days thead th.picker-switch"));
        let displayedYear = await _this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
        let noOfNext = Number(year) - Number(displayedYear);
        for (let i = 0; i < noOfNext; i++) {
            displayedYear = await _this.getTextFromWebElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.picker-switch"));
            if (displayedYear !== year) {
                await _this.clickOnElement(By.css("div[class*='picker-open'] div.datepicker-months thead th.next"));
            }
        }
    }

    async selectMonth(month) {
        let m = await this.getElementFromList(By.css("div[class*='picker-open'] div.datepicker-months tbody span"), month);
        await this.clickWhenClickable(m);
        // await m.click();
    }


    async selectDay(day) {
        let d = await this.getElementFromList(By.css("div[class*='picker-open'] div.datepicker-days tbody tr td[class*='day']"), day);
        await this.clickWhenClickable(d);
        // d.click();
    }

    async confirmBooking() {
        await this.clickOnElement(this.elements.saveBookingButton);
    }


}
module.exports = BookingPage;