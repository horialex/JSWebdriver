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

    async openStartDatePicker() {
        let _this = this;
        await _this.clickOnElement(_this.elements.startBookingDatePicker);
    }

    async openEndDatePicker() {
        let _this = this;
        await _this.clickOnElement(_this.elements.endBookingDatePicker);
    }

    async selectStartDate(startDate) {
        let _this = this;
        let year = startDate.split(",")[0].split(" ")[2];
        let month = startDate.split(",")[0].split(" ")[0];
        let day = startDate.split(",")[0].split(" ")[1];

        await _this.driver.wait(until.elementLocated(_this.elements.startBookingDatePicker), _this.waitTimeout).then(async function () {
            return await _this.driver.findElement(_this.elements.startBookingDatePicker).then(async function (element) {
                return await _this.clickWhenClickable(element);
            });
        });

        await _this.selectYear(year);
        await _this.selectMonth(month)
        await _this.selectDay(day);
    }

    async selectEndDate(endDate) {
        let _this = this;
        let year = endDate.split(",")[0].split(" ")[2];
        let month = endDate.split(",")[0].split(" ")[0];
        let day = endDate.split(",")[0].split(" ")[1];


        await _this.driver.wait(until.elementLocated(_this.elements.endBookingDatePicker), _this.waitTimeout).then(async function () {
            return await _this.driver.findElement(_this.elements.endBookingDatePicker).then(async function (element) {
                return await _this.clickWhenClickable(element);
            });
        });
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
        let _this = this;
        let m = await _this.getElementFromList(By.css("div[class*='picker-open'] div.datepicker-months tbody span"), month);
        await _this.clickWhenClickable(m);
    }


    async selectDay(day) {
        let _this = this;
        let myElement = await _this.getDayElement(day);
        await _this.clickWhenClickable(myElement);
    }

    async getDayElement(day) {
        let _this = this;
        return _this.driver.wait(until.elementsLocated(By.css("div[class*='picker-open'] div.datepicker-days tbody tr td[class*='day']"))).then(async function () {
            let myElement = null;
            await _this.driver.findElements(By.css("div[class*='picker-open'] div.datepicker-days tbody tr td[class*='day']")).then(async function (list) {
                list.forEach(async function (elem) {
                    let classAttrib = await elem.getAttribute('class');
                    if (!(classAttrib.includes('new')) && !(classAttrib.includes('disabled'))) {
                        await elem.getText().then(async function (elemText) {
                            if (day.trim() === elemText.trim()) {
                                myElement = elem;
                            }
                        })
                    }

                })
            });
            return myElement;
        })
    }

    async confirmBooking() {
        let _this = this;
        await _this.clickOnElement(_this.elements.saveBookingButton);
    }


}
module.exports = BookingPage;