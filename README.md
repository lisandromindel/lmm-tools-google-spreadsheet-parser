# LMM Tools -  Google Spreadsheet Parser

## Instalation
`npm i lmm-tools-google-spreadsheet-parser --save -E`

## Description
Loads and parses a Google Spreadsheet into JSON format.<br>
Requires a column named `status` with either a checkbox or plain text setting `TRUE` or `FALSE`.<br>
Requires a column named `id` that uses names with dot notation to create objects in the output.<br>
Requires a column named `copy` that will be mapped into the set id for that row.

## Usage
```
const copyParser = require( 'lmm-tools-google-spreadsheet-parser' );

const credentials = JSON.parse( fs.readFileSync( credentials_file ) );
const config = {
	key: google_spreadsheet_key,
	credentials: credentials,
	sheetList: array_of_tabs_to_parse
};
const copyParsed = copyParser.copy( config );
```

The parser returns a promise so in order to correctly parse the result, this method needs to be read on a async method with await. 
```
const result = ( await copyParsed );
```
