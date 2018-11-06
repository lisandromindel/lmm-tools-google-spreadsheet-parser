# LMM Tools - Google Spreadsheet Parser

## Instalation
`npm i lmm-tools-google-spreadsheet-parser --save -E`

## Description
Loads and parses a Google Spreadsheet into JSON format.<br>
Requires a column named `status` with either a checkbox or plain text setting `TRUE` or `FALSE`.<br>
Requires a column named `id` that uses names with dot notation to create objects in the output.<br>
Requires a column named `copy` that will be mapped into the set id for that row.

## Usage
```
const copyParser = require( "lmm-tools-google-spreadsheet-parser" );
const fs = require("fs");
const credentials = JSON.parse(fs.readFileSync("./client_id.json"));
const config = {
  key: google_spreadsheet_key,
  credentials: credentials,
  sheetList: [array_of_tabs_to_parse]
};
const copyParsed = copyParser.copy(config);
copyParsed
	.then(result => console.log(result))
	.catch(err => console.log('The package encountered an error.'));
```
Sample Google Spreadsheet [Sample](https://docs.google.com/spreadsheets/d/1s56Tbm71_lTTQ64Ioq8yErOaKGfjvNqn4hix22-CpsI/edit?usp=sharing)