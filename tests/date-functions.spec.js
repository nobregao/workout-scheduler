const { isSunday, isTuesday, isThursday, isToday, addDays, subtractDay, formatDate } = require('../src/util');

describe("Date Functions", () => {

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
});  