function updateSubscriptionList() {
  checkTokenExistence();
  var data = getSubscription();
  var header = getSubscriptionHeader();
  var sheet = prepareSheet(getText('subscription'));
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
    getText('is_draft')
  ];
}

function prepareSubscriptionData(sheet, data) {
  for (var i = 0; i < data.length; i++) {
    appendSubscriptionRow(sheet, data[i], i + 2);
  }
}

function appendSubscriptionRow(sheet, result, i) {
  var row = [
    result.title,
    result.url,
    result.num_lectures,
    result.estimated_content_length,
    result.last_update_date,
    result.num_subscribers,
    result.num_reviews,
    result.rating,
    result.completion_ratio,
    result.is_draft
  ];
  appendRow(sheet, row, i);
}

function sortSubscription(sheet) {
  var sortRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
  sortRange.sort([{
    column: 9,
    ascending: false
  }, {
    column: 8,
    ascending: false
  }]);
}

function setSubscriptionFilter(sheet) {
  var completionRatioCriteriaBuilder = SpreadsheetApp.newFilterCriteria();
  completionRatioCriteriaBuilder.whenNumberLessThan(100);
  var completionRatioCriteria = completionRatioCriteriaBuilder.build();

  var draftCriteriaBuilder = SpreadsheetApp.newFilterCriteria();
  draftCriteriaBuilder.setHiddenValues(["TRUE"]);
  var draftCriteria = draftCriteriaBuilder.build();

  var filterRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  var filter = filterRange.createFilter();
  filter.setColumnFilterCriteria(9, completionRatioCriteria);
  filter.setColumnFilterCriteria(10, draftCriteria);
}