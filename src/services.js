const filter = (value, data = []) => {
  let results = [];

  // we want to filter the list based on animals

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    // for each list of people's animals we check if there is animals named that contains the pattern passed.
    // We filter them to have the list of animals that matches the filter, which will be the new list of animals of the people concerned

    let firstTimeMatched = true;

    if (element.people) {
      for (let peopIn = 0; peopIn < element.people.length; peopIn++) {
        let population = element.people[peopIn];

        if (population.animals) {
          const matchedAnimals = getMatchedAnimals(population.animals, value);

          if (matchedAnimals.length > 0) {
            // population, For the first time when there are animals that name's contain the pattern,
            // we add the current pepole and animals matched list to the global results
            // if it's not the first time, we just push pepole and animals matched list to the current element ( population ) of global results

            const newMatched = { ...population, animals: matchedAnimals };

            if (firstTimeMatched) {
              results.push({
                ...element,
                people: [newMatched],
              });
              firstTimeMatched = false;
            } else {
              results[results.length - 1].people.push(newMatched);
            }
          }
        }
      }
    }
  }
  return results;
};

const count = (data = []) => {
  return data.map((element) => ({
    name: formatName(element.name, element.people),
    people: performPeople(element),
  }));
};

const formatName = (name, list = []) => {
  return `${name} [${list.length}]`;
};

const performPeople = (element) => {
  if (element.people) {
    return element.people.map((people) => ({
      ...people,
      name: formatName(people.name, people.animals),
    }));
  }
};

const getMatchedAnimals = (animals, value) =>
  animals.filter(({ name }) => RegExp(value).test(name));

module.exports = {
  filter,
  count,
};
