function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Udemy')
    .addItem(getText('update_all'), 'updateAll')
    .addSeparator()
    .addItem(getText('update_wishlist'), 'updateWishlist')
    .addItem(getText('update_subscription_list'), 'updateSubscriptionList')
    .addItem(getText('change_bearer_token'), 'openBearerTokenDialog')
    .addToUi();
}

function updateAll() {
  checkTokenExistence();
  updateWishlist();
  updateSubscriptionList();
}

function openBearerTokenDialog() {
  var ui = SpreadsheetApp.getUi();
  var oldToken = getToken();
  var message;
  if (oldToken) {
    message = getText('enter_bearer_token_current_token_is') + oldToken;
  } else {
    message = getText('enter_bearer_token');
  }
  
  var result = ui.prompt(message);
  var button = result.getSelectedButton();
  var newToken = result.getResponseText();
  
  if (button == ui.Button.OK) {

    setToken(newToken);
    ui.alert(getText('token_changed'));
  }
}