const { extractSheets } = require("spreadsheet-to-json");

const parser = config => {
  return new Promise((resolve, reject) => {
    extractSheets(
      {
        spreadsheetKey: config.key,
        credentials: config.credentials,
        sheetsToExtract: config.sheetList
      },
      (err, data) => {
        if (err) {
          console.log("!! Error reading spread sheet data !!");
          // Stop the build if something goes wrong from google side
          reject(err);
        } else {
          const copy = {};
          for (var key of Object.keys(data)) {
            const tabData = data[key];
            let cell = {};
            tabData.map(cellData => {
              const cellValue =
                cellData.copy !== "[]"
                  ? cellData.status === "TRUE"
                    ? cellData.copy
                    : ""
                  : cellData.copy;
              const cellId = cellData.id;
              const idSplit = cellId.split(".");
              let currentObject = cell;
              for (var i = 0; i < idSplit.length; i++) {
                if (currentObject[idSplit[i]] === undefined) {
                  if (i === idSplit.length - 1) {
                    currentObject[idSplit[i]] =
                      cellValue === "[]" ? [] : cellValue;
                  } else {
                    currentObject[idSplit[i]] = {};
                  }
                  currentObject = currentObject[idSplit[i]];
                } else {
                  currentObject = currentObject[idSplit[i]];
                }
              }
            });
            copy[key.toLowerCase()] = cell;
          }
          resolve(copy);
        }
      }
    );
  });
};

const copy = async config => {
  return await parser(config);
};

exports.copy = copy;
