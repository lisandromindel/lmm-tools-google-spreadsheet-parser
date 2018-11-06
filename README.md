# LMM Tools - Google Spreadsheet Parser

Uses [spreadsheet-to-json](https://www.npmjs.com/package/spreadsheet-to-json) as base for parsing.

## Instalation
`npm i lmm-tools-google-spreadsheet-parser --save -E`

## Description
Loads and parses a Google Spreadsheet into JSON.<br>
Formating data by unsing dot-notation from id column or arrays by declaring `[]` on copy column.

## Authentification
See authentification section on base package listed above.

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

## Sample Spreadsheet
[Sample](https://docs.google.com/spreadsheets/d/1s56Tbm71_lTTQ64Ioq8yErOaKGfjvNqn4hix22-CpsI/edit?usp=sharing)

- Requires a column named `status` with either a checkbox or plain text setting `TRUE` or `FALSE`.<br>
- Requires a column named `id` that uses names with dot notation to create objects in the output.<br>
- Requires a column named `copy` that will be mapped into the set id for that row.

## Result Example
```
{
  "default": {
    "name": "John",
    "lastname": "Doe",
    "job": {
      "title": "Director",
      "name": "Accounting",
      "colleagues": [
        { "name": "Maria", "lastname": "Kent" },
        { "name": "Martin", "lastname": "Gibson" }
      ]
    }
  }
}
```