const { data } = require("../data");
const { filter, count } = require("./services");

exports.searchByArg = () => {
  let results = [];

  // we get command-line argv
  let filterArg = process.argv.find((item) => item.includes("--filter"));
  let countArg = process.argv.find((item) => item.includes("--count"));

  if (filterArg) {
    let val = filterArg.substring(9);
    results = filter(val, data);
  }

  if (countArg) {
    results = !filterArg ? count(results, data) : count(results);
  }

  return results;
};
