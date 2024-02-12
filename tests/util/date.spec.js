const { isSunday, isTuesday, isThursday, isToday, formatDate, subtractDay, addDays, getDaysToSearch } = require('../../src/util/date');

describe("Date Util Functions", () => {

  describe("isSunday", () => {
    it("should return true if the date is a Sunday", () => {
      const sundayDate = new Date("2024-01-29");
      expect(isSunday(sundayDate)).toBe(true);
    });

    it("should return false if the date is not a Sunday", () => {
      const nonSundayDate = new Date("2024-01-30");
      expect(isSunday(nonSundayDate)).toBe(false);
    });
  });

  describe("isTuesday", () => {
    it("should return true if the date is a Tuesday", () => {
      const tuesdayDate = new Date(2024, 0, 2);
      expect(isTuesday(tuesdayDate)).toBe(true);
    });

    it("should return false if the date is not a Tuesday", () => {
      const nonTuesdayDate = new Date(2024, 0, 3);
      expect(isTuesday(nonTuesdayDate)).toBe(false);
    });
  });

  describe("isThursday", () => {
    it("should return true if the date is a Thursday", () => {
      const thursdayDate = new Date(2024, 0, 4);
      expect(isThursday(thursdayDate)).toBe(true);
    });

    it("should return false if the date is not a Thursday", () => {
      const nonThursdayDate = new Date(2024, 0, 5);
      expect(isThursday(nonThursdayDate)).toBe(false);
    });
  });

  describe("isToday", () => {
    it("should return true if the date is today", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it("should return false if the date is not today", () => {
      const yesterday = subtractDay(new Date());
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe("formatDate", () => {
    it("should format the date correctly", () => {
      const date = new Date(2024, 0, 29);
      expect(formatDate(date)).toBe("29/1/2024");
    });
  });

  describe("subtractDay", () => {
    it("should subtract one day from the date", () => {
      const testDate = new Date(2024, 0, 30);
      expect(subtractDay(testDate).getDate()).toBe(29);
    });
  });

  describe("addDays", () => {
    it("should add specified number of days to the date", () => {
      const testDate = new Date(2024, 0, 29);
      expect(addDays(testDate, 1).getDate()).toBe(30);
    });
  });

  describe("getDaysToSearch", function () {

    it("should return an array", function () {
      expect(Array.isArray(getDaysToSearch(5))).toBe(true);
    });

    it("should return the correct number of dates for searching", function () {
      expect(getDaysToSearch(3)).toHaveSize(3);
    });

    it("should return dates as instances of Date", function () {
      let dates = getDaysToSearch(2)

      expect(dates[0] instanceof Date).toBe(true);
      expect(dates[1] instanceof Date).toBe(true);
    });

    it("should return dates in the future", function () {
      const futureDates = getDaysToSearch(3)
      const currentDate = futureDates[0];

      expect(futureDates[1] > currentDate).toBe(true);
      expect(futureDates[2] > currentDate).toBe(true);
    });

    it("should return dates in the past when signal is '-'", function () {
      const pastDates = getDaysToSearch(3, "-");
      const currentDate = pastDates[pastDates.length - 1];

      expect(pastDates[0] < currentDate).toBe(true);
      expect(pastDates[1] < currentDate).toBe(true);
    });
  });

});  