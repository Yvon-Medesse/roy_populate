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
  test("filter a list of elements containing a ry", () => {
    process.argv = ["--filter=ry"];
    let results = searchByArg();
    expect(results.length).toBe(2);
  });

  test("filter by Mouse return 2 results", () => {
    process.argv = ["--filter=Mouse"];
    let results = searchByArg();
    expect(results.length).toBe(2);
  });

  test("Only animals containing Mouse are displayed ", () => {
    process.argv = ["--filter=Mouse"];
    let results = searchByArg();

    // All people animals  displayed contains All Mouse

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
  test("All population ( element of list ) ont tous des animaux qui contiennent Cat", () => {
    _test_only_animals_containing_pattern_are_displayed(results, "Cat");
  });

  test("Foreach population ( element of list ), the number of people are append to population name ", () => {
    _test_people_count_are_pending_in_element_name(results);
  });

  test("Foreach people, the number of animals are append to people name ", () => {
    _test_animals_count_are_pending_in_people_name(results);
  });
});
