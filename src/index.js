const { data } = require("../data");
const { filter, count } = require("./services");

exports.searchByArg = (argv = process.argv) => {
  let results = [];

  // we get command-line argv
  let filterArg = argv.find((item) => item.includes("--filter"));
  let countArg = argv.find((item) => item.includes("--count"));

  if (filterArg) {
    let val = filterArg.substring(9);
    results = filter(val, data);
  }

  if (countArg) {
    results = !filterArg ? count(results, data) : count(results);
  }

  return results;
};
