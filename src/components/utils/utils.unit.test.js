import * as utils from "./utils";

describe("Testing of utility Functionss", () => {
  it("Epoch to Date", () => {
    expect(utils.epochToDate(1529246933, -4)).toBe("2018-06-17");
  });

  it("Epoch to DateTime", () => {
    expect(utils.epochToDateTime(1529246933, -4)).toBe("2018-06-17 10:48:53");
  });

  it("Epoch to Time", () => {
    expect(utils.epochToTime(1529246933, -4)).toBe("10:48:53");
  });

  it("Add Keys", () => {
    const arr = [{ test1: "test1" }, { test2: "test2" }];
    const obj = arr.map(utils.addKeys);
    expect(obj).toMatchSnapshot();
  });

  it("DateTime to Epoch", () => {
    expect(utils.dateToEpoch("2018-06-17 10:48:53", -4)).toEqual(1529246933);
  });

  it("Date to Epoch", () => {
    expect(utils.dateToEpoch("2018-06-17", -4)).toEqual(1529193600);
  });

  it("Get Previous 30 Date", () => {
    const baseDate = new Date(1528609611 * 1000); // 06-10-2018
    expect(utils.getPrevious30Dates(baseDate)).toMatchSnapshot();
  });

  it("Get Future 30 Date", () => {
    const baseDate = new Date(1528609611 * 1000); // 06-10-2018
    expect(utils.getFuture30Dates(baseDate)).toMatchSnapshot();
  });
});
