const BasePage = require("../common/base_page_es6");
const Booking = require("../models/booking");
const assert = require('assert');
const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;


class BookingsPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.elements = {
      bookingsActions: By.css("ul[class*='nav nav-tabs nav-decoration'] a"),
      bookingsContainer: By.css("ul[class*='bookings-listing']"),
      bookingsContainersList: By.css("ul[class*='bookings-listing'] div[class*='item-booking-container']"),
      bookingsItemName: By.css("div[class*='booking-details-container'] ul li:nth-child(1) a"),
      bookingsItemStartDate: By.css("div[class*='booking-details-container'] ul li:nth-child(2) span:nth-child(2)"),
      bookingsItemEndDate: By.css("div[class*='booking-details-container'] ul li:nth-child(2) span:nth-child(4)"),
      bookingsUser: By.css("div[class*='booking-details-container'] ul li:nth-child(3) a")

    }
  }

  async selectBookingsAction(action) {
    await this.clickOnElementInList(this.elements.bookingsActions, action);
  }

  async validateBooking(booking) {
    let bookingValid = false;
    let actualBookings = await this.selectBookings();
    await actualBookings.forEach(element => {
      if (element.itemName === booking.itemName) bookingValid = true;
    });
    assert(bookingValid == true, 'The booking was not found in the bookings list');
  }

  async selectBookings() {
    let _this = this;
    let actualbookignsArray = [];
    await _this.sleep(1000);
    await _this.driver.wait(until.elementsLocated(_this.elements.bookingsContainersList)).then(async function () {
      await _this.driver.findElements(_this.elements.bookingsContainersList).then(async function (list) {
        await list.forEach(async function (elem) {
          let booking = new Booking();
          await elem.findElement(_this.elements.bookingsItemName).getText().then(async function (elemText) {
            booking.itemName = await elemText;
          });
          // await elem.findElement(_this.elements.bookingsItemStartDate).getText().then(async function (startDateText) {
          //   booking.startDate = await startDateText;
          // });
          // await elem.findElement(_this.elements.bookingsItemEndDate).getText().then(async function (elemText) {
          //   booking.endDate = await elemText;
          // })
          // await elem.findElement(_this.elements.bookingsUser).getText().then(async function (elemText) {
          //   booking.user = await elemText;
          // })
          await actualbookignsArray.push(booking);
        })
      })
    });
    return actualbookignsArray;
  }





}
module.exports = BookingsPage;