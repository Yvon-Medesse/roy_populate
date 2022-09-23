const { data } = require("../data");
const { filter, count } = require("./services");

exports.searchByArg = () => {
  let results = [];

  // we get command-line argv
  let filterArg = process.argv.find((item) => item.includes("--filter="));
  let countArg = process.argv.find((item) => item === "--count");

  if (!filterArg && !countArg) {
    throw new Error("invalid parameters");
  }

  if (filterArg) {
    let val = filterArg.substring(9);
    results = filter(val, data);
  }

  if (countArg) {
    results = !filterArg ? count(data) : count(results);
  }

  return results;
};
