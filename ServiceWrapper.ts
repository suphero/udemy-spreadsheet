function getWishlist() {
  var token = getToken();
  var params = {
    method: "GET",
    contentType: 'application/json',
    headers: {
      Authorization: "Bearer " + token
    },
    muteHttpExceptions: true
  };

  var baseUrl = "https://www.udemy.com/api-2.0/users/me/wishlisted-courses";
  var fieldsCourse = "@min,rating,num_reviews,num_subscribers,discount,is_recently_published,rating,num_reviews,num_subscribers,num_lectures,estimated_content_length,last_update_date";
  var fieldsUser = "@default";
  var includeSpam = "true";
  var page = "1";
  var pageSize = "100";

  var url = baseUrl + "?fields%5Bcourse%5D=" + fieldsCourse + "&fields%5Buser%5D=" + fieldsUser + "&include_spam=" + includeSpam + "&page=" + page + "&page_size=" + pageSize;
  var result = getWholeData(url, params);
  return result;
}

function getSubscription() {
  var token = getToken();
  var params = {
    method: "GET",
    contentType: 'application/json',
    headers: {
      Authorization: "Bearer " + token
    },
    muteHttpExceptions: true
  };

  var baseUrl = "https://www.udemy.com/api-2.0/users/me/subscribed-courses";
  var fieldsCourse = "@min,rating,num_reviews,num_subscribers,discount,is_recently_published,rating,num_reviews,num_subscribers,num_lectures,estimated_content_length,last_update_date,completion_ratio,is_draft";
  var fieldsUser = "@min,job_title";
  var includeSpam = "true";
  var page = "1";
  var pageSize = "100";

  var url = baseUrl + "?fields%5Bcourse%5D=" + fieldsCourse + "&fields%5Buser%5D=" + fieldsUser + "&include_spam=" + includeSpam + "&page=" + page + "&page_size=" + pageSize;
  var result = getWholeData(url, params);
  return result;
}

function getWholeData(url, params) {
  var results = [];
  do {
    var iterationDataText = UrlFetchApp.fetch(url, params);
    var responseCode = iterationDataText.getResponseCode();
    var iterationData = JSON.parse(iterationDataText.getContentText());
    if (responseCode != 200) {
      throw (iterationData.detail);
    }
    results = results.concat(iterationData.results);
    url = iterationData.next;
  }
  while (url);
  return results;
}