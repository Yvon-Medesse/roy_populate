// import { expect } from "@jest/globals";
const { data } = require("../data");
const { searchByArg } = require("../src");
const {
  _test_only_animals_containing_pattern_are_displayed,
  _test_people_count_are_pending_in_element_name,
  _test_animals_count_are_pending_in_people_name,
  getRegex,
} = require("./utils");

const args = {
  filTerBy: (val) => ["--filter=" + val],
  count: ["--count"],
  filterAndCount: (val) => ["--filter=" + val, "--count"],
};

describe("===> Test: Filter a list of elements containing a pattern", () => {
  test("filter a list of elements containing a ry", () => {
    let results = searchByArg(args.filTerBy("ry"));
    expect(results.length).toBe(2);
  });

  test("filter by Mouse return 2 results", () => {
    let results = searchByArg(args.filTerBy("Mouse"));
    expect(results.length).toBe(2);
  });

  test("Only animals containing Mouse are displayed ", () => {
    let results = searchByArg(args.filTerBy("Mouse"));

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

describe("==> Test : Counts of People and Animals by counting the number of children and appending it in the name", () => {
  let results = searchByArg(args.count);

  test("Foreach population ( element of list ), the number of people are append to population name ", () => {
    _test_people_count_are_pending_in_element_name(results);
  });

  test("Foreach people, the number of animals are append to people name ", () => {
    _test_animals_count_are_pending_in_people_name(results);
  });
});

describe("==> Test : filter and Count  ", () => {
  let results = searchByArg(args.filterAndCount("Cat"));

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
