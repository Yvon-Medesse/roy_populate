const getRegex = (pattern) => RegExp(pattern);

const _test_only_animals_containing_pattern_are_displayed = (
  results = [],
  pattern = ""
) => {
  const regex = getRegex(pattern);

  // For each filter result, we have no animals that do not contain the pattern
  results.forEach((element) => {
    element.people.forEach((people) => {
      const animals = people.animals.filter(({ name }) => !regex.test(name));
      expect(animals.length).toBe(0);
    });
  });
};

const _test_people_count_are_pending_in_element_name = (results) => {
  results.forEach((element) => {
    const pepoleCount = element.people.length;
    expect(element.name).toContain(`[${pepoleCount}]`);
    expect(element.name.endsWith(`[${pepoleCount}]`)).toBe(true);
  });
};

const _test_animals_count_are_pending_in_people_name = (results) => {
  results.forEach((element) => {
    element.people.forEach((people) => {
      const animalsCount = people.animals.length;
      expect(people.name).toContain(`[${animalsCount}]`);
      expect(people.name.endsWith(`[${animalsCount}]`)).toBe(true);
    });
  });
};

module.exports = {
  getRegex,
  _test_only_animals_containing_pattern_are_displayed,
  _test_people_count_are_pending_in_element_name,
  _test_animals_count_are_pending_in_people_name,
};
