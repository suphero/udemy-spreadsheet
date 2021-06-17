import { appendRow, checkTokenExistence, prepareHeader, prepareSheet } from './Common';
import { getWishlist } from './ServiceWrapper';
import { IWishlistedCourse } from './Types';

export function updateWishlist() {
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

function prepareWishlistData(sheet, data: IWishlistedCourse[]) {
  for (let i = 0; i < data.length; i++) {
    appendWishlistRow(sheet, data[i], i + 2);
  }
}

function appendWishlistRow(sheet, result: IWishlistedCourse, i) {
  const row = [
    result.title,
    result.url,
    result.num_published_lectures,
    result.estimated_content_length,
    result.last_update_date,
    result.num_subscribers,
    result.num_reviews,
    result.rating,
    result.discount?.price?.amount || result.price_detail?.amount,
  ];
  appendRow(sheet, row, i);
}

function sortWishlist(sheet) {
  const sortRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
  sortRange.sort([{
    ascending: false,
    column: 8,
  }]);
}

function setWishlistFilter(sheet) {
  const filterRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  filterRange.createFilter();
}
