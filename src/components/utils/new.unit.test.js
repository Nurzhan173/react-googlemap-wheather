import * as utils from "./utils";

describe("Test new func", () => {
  it("get 10 records per page", () => {
    const baseDate = new Date(1528609611 * 1000);
    let records = utils.getPrevious30Dates(new Date(baseDate));
    console.log(records);
    expect(
      utils.paginateRecords(records, 10).filter(date => date.page === 1)
    ).toMatchSnapshot();
  });

  it("dummy test", () => {
    it("none", () => {
      expect(false).toBe(false);
    });
  });
});
