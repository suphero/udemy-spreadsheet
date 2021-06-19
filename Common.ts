import { ISubscribedCourse, ISubscriptionEntity, IWishlistedCourse, IWishlistEntity } from './Types';

function prepareSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
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

function prepareHeader(sheet: GoogleAppsScript.Spreadsheet.Sheet, header: any[]) {
  appendRow(sheet, header, 1);
}

function appendRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, rows: any[], row: number) {
  const newData = [];
  newData.push(rows);
  sheet.getRange(row, 1, 1, rows.length).setValues(newData);
}

function getToken() {
  const properties = PropertiesService.getUserProperties();
  return properties.getProperty('token');
}

function setToken(token: string) {
  const properties = PropertiesService.getUserProperties();
  properties.setProperty('token', token);
}

function checkTokenExistence() {
  const token = getToken();
  if (token !== null) { return; }
  throw (getText('bearer_token_not_exist'));
}

function mapToSubscriptionEntity(course: ISubscribedCourse): ISubscriptionEntity {
  return {
    completion_ratio: course.completion_ratio,
    estimated_content_length: course.estimated_content_length,
    is_draft: course.is_draft,
    last_update_date: course.last_update_date,
    num_lectures: course.num_lectures,
    num_reviews: course.num_reviews,
    num_subscribers: course.num_subscribers,
    rating: course.rating,
    title: course.title,
    url: course.url,
  };
}

function getSubscriptionRow(entity: ISubscriptionEntity) {
  return [
    entity.title,
    entity.url,
    entity.num_lectures,
    entity.estimated_content_length,
    entity.last_update_date,
    entity.num_subscribers,
    entity.num_reviews,
    entity.rating,
    entity.completion_ratio,
    entity.is_draft,
  ];
}

function mapToWishlistEntity(course: IWishlistedCourse): IWishlistEntity {
  return {
    estimated_content_length: course.estimated_content_length,
    last_update_date: course.last_update_date,
    num_published_lectures: course.num_published_lectures,
    num_reviews: course.num_reviews,
    num_subscribers: course.num_subscribers,
    price: course.discount?.price?.amount || course.price_detail?.amount,
    rating: course.rating,
    title: course.title,
    url: course.url,
  };
}

function getWishlistRow(entity: IWishlistEntity) {
  return [
    entity.title,
    entity.url,
    entity.num_published_lectures,
    entity.estimated_content_length,
    entity.last_update_date,
    entity.num_subscribers,
    entity.num_reviews,
    entity.rating,
    entity.price,
  ];
}

export {
  appendRow,
  checkTokenExistence,
  getSubscriptionRow,
  getWishlistRow,
  getToken,
  mapToSubscriptionEntity,
  mapToWishlistEntity,
  prepareHeader,
  prepareSheet,
  setToken,
};
