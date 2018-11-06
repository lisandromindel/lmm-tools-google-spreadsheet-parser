const copyParser = require("./");
const fs = require("fs");

const credentials = JSON.parse(fs.readFileSync("./client_id.json"));
const config = {
  key: "1s56Tbm71_lTTQ64Ioq8yErOaKGfjvNqn4hix22-CpsI",
  credentials: credentials,
  sheetList: ["Default"]
};
const copyParsed = copyParser.copy(config);
copyParsed
	.then(result => console.log(result))
	.catch(err => console.log('The package encountered an error.'));
