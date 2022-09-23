// import { expect } from "@jest/globals";
const { data } = require("../data");
const { searchByArg } = require("../src");
const {
  _test_only_animals_containing_pattern_are_displayed,
  _test_people_count_are_pending_in_element_name,
  _test_animals_count_are_pending_in_people_name,
  getRegex,
} = require("./utils");

describe("===> Test: Filter a list of elements containing a pattern", () => {
  test("filter a list of elements containing a ry return 2 results", () => {
    process.argv = ["--filter=ry"];
    let results = searchByArg();
    expect(results.length).toBe(2);
  });

  test("Only animals containing Mouse are displayed ", () => {
    process.argv = ["--filter=Mouse"];
    let results = searchByArg();

    // people animals  displayed contains All Mouse

    _test_only_animals_containing_pattern_are_displayed(results, "Mouse");

    // initial people contain several animals which do not contain the pattern Mouse

    results.forEach((element) => {
      const initialPopulation = data.find((item) => item.name === element.name);
      expect(initialPopulation !== undefined).toBe(true);

      initialPopulation.people.forEach((initalPeople) => {
        const initilaAnimals = initalPeople.animals.filter(
          ({ name }) => !getRegex("Mouse").test(name)
        );
        expect(initilaAnimals.length).toBeGreaterThan(0);
      });
    });
  });

  test("Empty array after filtering are NOT returned", () => {
    process.argv = ["--filter=Mouse"];
    let results = searchByArg();

    let count = results.filter((element) => element.people.length === 0).length;
    expect(count).toBe(0);

    count = results.filter(
      (element) =>
        element.people.filter((people) => people.animals.length === 0).length >
        0
    ).length;
    expect(count).toBe(0);
  });
});

describe("==> Test : Counts", () => {
  process.argv = ["--count"];
  let results = searchByArg();
  test("Foreach population ( element of list ), the number of people are append to population name ", () => {
    _test_people_count_are_pending_in_element_name(results);
  });

  test("Foreach people, the number of animals are append to people name ", () => {
    _test_animals_count_are_pending_in_people_name(results);
  });
});

describe("==> Test : filter and Count  ", () => {
  process.argv = ["--filter=Cat", "--count"];
  let results = searchByArg();
  test("Population (list item) has all animals whose name contains Cat", () => {
    _test_only_animals_containing_pattern_are_displayed(results, "Cat");
  });

  test("Foreach population ( element of list ), the number of people are append to population name ", () => {
    _test_people_count_are_pending_in_element_name(results);
  });

  test("Foreach people, the number of animals are append to people name ", () => {
    _test_animals_count_are_pending_in_people_name(results);
  });

  process.argv = ["--count", "--filter=Cat"];
  results = searchByArg();
  test("In the reverse order of command line parameters, we always have animals whose name contains a pattern. The children count appended to the names", () => {
    _test_only_animals_containing_pattern_are_displayed(results, "Cat");
    _test_animals_count_are_pending_in_people_name(results);
  });
});

describe("==> Test : Security  ", () => {
  test("should return an error if there is no valid parameter", () => {
    process.argv = ["--filtersx=Cat", "--counts"];

    try {
      searchByArg();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("invalid parameters");
    }
  });

  test("should return an error if there is no parameter", () => {
    process.argv = [];

    try {
      searchByArg();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("invalid parameters");
    }
  });

  test("must not return an error if there is at least one valid parameter", () => {
    process.argv = ["--filterxs=Cat", "--count"];
    const results = searchByArg();
    expect(results.length).toBeGreaterThan(0);
  });
});
