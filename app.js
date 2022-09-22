const { searchByArg } = require("./src");

let results = searchByArg(process.argv);

results = JSON.stringify(results, null, 2);
console.log(results);
