import { appendRow, checkTokenExistence, prepareHeader, prepareSheet } from './Common';
import { getSubscription } from './ServiceWrapper';
import { ISubscribedCourse } from './Types';

export function updateSubscriptionList() {
  checkTokenExistence();
  const data = getSubscription();
  const header = getSubscriptionHeader();
  const sheet = prepareSheet(getText('subscription'));
  prepareHeader(sheet, header);
  prepareSubscriptionData(sheet, data);
  sortSubscription(sheet);
  setSubscriptionFilter(sheet);
}

function getSubscriptionHeader() {
  return [
    getText('title'),
    getText('url'),
    getText('lectures'),
    getText('content_length'),
    getText('last_update'),
    getText('subscribers'),
    getText('reviews'),
    getText('rating'),
    getText('completion_ratio'),
    getText('is_draft'),
  ];
}

function prepareSubscriptionData(sheet: GoogleAppsScript.Spreadsheet.Sheet, data: ISubscribedCourse[]) {
  for (let i = 0; i < data.length; i++) {
    appendSubscriptionRow(sheet, data[i], i + 2);
  }
}

function appendSubscriptionRow(sheet: GoogleAppsScript.Spreadsheet.Sheet, result: ISubscribedCourse, i) {
  const row = [
    result.title,
    result.url,
    result.num_lectures,
    result.estimated_content_length,
    result.last_update_date,
    result.num_subscribers,
    result.num_reviews,
    result.rating,
    result.completion_ratio,
    result.is_draft,
  ];
  appendRow(sheet, row, i);
}

function sortSubscription(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  const sortRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
  sortRange.sort([{
    ascending: false,
    column: 9,
  }, {
    ascending: false,
    column: 8,
  }]);
}

function setSubscriptionFilter(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  const completionRatioCriteriaBuilder = SpreadsheetApp.newFilterCriteria();
  completionRatioCriteriaBuilder.whenNumberLessThan(100);
  const completionRatioCriteria = completionRatioCriteriaBuilder.build();

  const draftCriteriaBuilder = SpreadsheetApp.newFilterCriteria();
  draftCriteriaBuilder.setHiddenValues(['TRUE']);
  const draftCriteria = draftCriteriaBuilder.build();

  const filterRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  const filter = filterRange.createFilter();
  filter.setColumnFilterCriteria(9, completionRatioCriteria);
  filter.setColumnFilterCriteria(10, draftCriteria);
}
