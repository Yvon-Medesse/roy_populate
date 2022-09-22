const { searchByArg } = require("./src");

let results = searchByArg();

results = JSON.stringify(results, null, 2);
console.log(results);
