import { getToken } from './Common';
import { ISubscribedCourse, IWishlistedCourse } from './Types';

const apiBaseUrl = 'https://www.udemy.com/api-2.0';

function getWishlist(): IWishlistedCourse[] {
  const token = getToken();
  const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'get',
    muteHttpExceptions: true,
  };

  const courseFieldArray = [
    '@default',
    'rating',
    'num_published_lectures',
    'num_reviews',
    'num_subscribers',
    'discount',
    'estimated_content_length',
    'last_update_date',
  ];
  const courseFields = courseFieldArray.join(',');
  const queryParams = {
    'fields[course]': courseFields,
    'fields[user]': '@default',
    'page': 1,
    'page_size': 100,
  };
  const queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');

  const url = `${apiBaseUrl}/users/me/wishlisted-courses/?${queryString}`;
  Logger.log(url);
  return getWholeData(url, params);
}

function getSubscription(): ISubscribedCourse[] {
  const token = getToken();
  const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'get',
    muteHttpExceptions: true,
  };

  const courseFieldArray = [
    '@min,completion_ratio',
    'num_lectures',
    'estimated_content_length',
    'last_update_date',
    'num_subscribers',
    'num_reviews',
    'rating',
    'is_draft',
  ];
  const courseFields = courseFieldArray.join(',');
  const queryParams = {
    'fields[course]': courseFields,
    'fields[user]': '@min,job_title',
    'is_archived': false,
    'page': 1,
    'page_size': 100,
  };
  const queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');

  const url = `${apiBaseUrl}/users/me/subscribed-courses/?${queryString}`;
  Logger.log(url);
  return getWholeData(url, params);
}

function getWholeData(url: string, params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions) {
  let results = [];
  do {
    const iterationDataText = UrlFetchApp.fetch(url, params);
    const responseCode = iterationDataText.getResponseCode();
    const iterationData = JSON.parse(iterationDataText.getContentText());
    if (responseCode !== 200) {
      throw (iterationData.detail);
    }
    results = results.concat(iterationData.results);
    url = iterationData.next;
  }
  while (url);
  return results;
}

export {
  getSubscription,
  getWishlist,
};
