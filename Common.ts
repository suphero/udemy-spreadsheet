export function prepareSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
  const spreadSheet = SpreadsheetApp.getActive();
  const oldSheet = spreadSheet.getSheetByName(sheetName);
  let newSheet: GoogleAppsScript.Spreadsheet.Sheet;
  if (oldSheet != null) {
    const index = oldSheet.getIndex();
    spreadSheet.deleteSheet(oldSheet);
    newSheet = spreadSheet.insertSheet(sheetName, index - 1);
  } else {
    newSheet = spreadSheet.insertSheet(sheetName);
  }
  newSheet.setFrozenRows(1);
  return newSheet;
}

export function prepareHeader(sheet: GoogleAppsScript.Spreadsheet.Sheet, header: any[]) {
  appendRow(sheet, header, 1);
}

export function appendRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, rows: any[], row: number) {
  const newData = [];
  newData.push(rows);
  sheet.getRange(row, 1, 1, rows.length).setValues(newData);
}

export function getToken() {
  const properties = PropertiesService.getUserProperties();
  return properties.getProperty('token');
}

export function setToken(token: string) {
  const properties = PropertiesService.getUserProperties();
  properties.setProperty('token', token);
}

export function checkTokenExistence() {
  const token = getToken();
  if (token !== null) { return; }
  throw (getText('bearer_token_not_exist'));
}
