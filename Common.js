import 'google-apps-script';

function prepareSheet(sheetName) {
  var spreadSheet = SpreadsheetApp.getActive();
  var oldSheet = spreadSheet.getSheetByName(sheetName);
  var newSheet;
  if (oldSheet != null) {
    var index = oldSheet.getIndex();
    spreadSheet.deleteSheet(oldSheet);
    newSheet = spreadSheet.insertSheet(sheetName, index - 1);
  } else {
    newSheet = spreadSheet.insertSheet(sheetName);
  }
  newSheet.setFrozenRows(1);
  return newSheet;
}

function prepareHeader(sheet, header) {
  appendRow(sheet, header, 1);
}

function appendRow(sheet, row, i) {
  var newData = [];
  newData.push(row);
  sheet.getRange(i, 1, 1, row.length).setValues(newData);
}

function getToken() {
  var properties = PropertiesService.getUserProperties();
  var token = properties.getProperty('token');
  return token;
}

function setToken(token) {
  var properties = PropertiesService.getUserProperties();
  properties.setProperty('token', token);
}

function checkTokenExistence() {
  var token = getToken();
  if (token != null) return;
  throw('Bearer Token does not exist, please change token at "Udemy -> Change Bearer Token"');
}