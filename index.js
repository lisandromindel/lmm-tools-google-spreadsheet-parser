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
          Object.keys(data).map(tab => {
            const tabData = data[tab];
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
              const idSplitLength = idSplit.length;
              let currentObject = cell;
              idSplit.map((id, i) => {
                if (currentObject[id] === undefined) {
                  if (i === idSplitLength - 1) {
                    currentObject[id] =
                      cellValue === "[]" ? [] : cellValue;
                  } else {
                    currentObject[id] = {};
                  }
                  currentObject = currentObject[id];
                } else {
                  currentObject = currentObject[id];
                }
              });
            });
            copy[tab.toLowerCase()] = cell;
          });
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
