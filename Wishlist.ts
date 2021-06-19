import {
  appendRow,
  checkTokenExistence,
  getWishlistRow,
  mapToWishlistEntity,
  prepareHeader,
  prepareSheet,
} from './Common';
import { getWishlist } from './ServiceWrapper';
import { IWishlistedCourse } from './Types';

function updateWishlist() {
  checkTokenExistence();
  const data = getWishlist();
  const header = getWishlistHeader();
  const sheet = prepareSheet(getText('wishlist'));
  prepareHeader(sheet, header);
  prepareWishlistData(sheet, data);
  sortWishlist(sheet);
  setWishlistFilter(sheet);
}

function getWishlistHeader() {
  return [
    getText('title'),
    getText('url'),
    getText('lectures'),
    getText('content_length'),
    getText('last_update'),
    getText('subscribers'),
    getText('reviews'),
    getText('rating'),
    getText('price'),
  ];
}

function prepareWishlistData(sheet: GoogleAppsScript.Spreadsheet.Sheet, data: IWishlistedCourse[]) {
  for (let i = 0; i < data.length; i++) {
    appendWishlistRow(sheet, data[i], i + 2);
  }
}

function appendWishlistRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, result: IWishlistedCourse, row: number) {
  const entity = mapToWishlistEntity(result);
  const rows = getWishlistRow(entity);
  appendRow(sheet, rows, row);
}

function sortWishlist(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  const sortRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
  sortRange.sort([{
    ascending: false,
    column: 8,
  }]);
}

function setWishlistFilter(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  const filterRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  filterRange.createFilter();
}

export {
  updateWishlist,
};
