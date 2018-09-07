function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Udemy')
    .addItem(getText('update_all'), 'updateAllUI')
    .addSeparator()
    .addItem(getText('update_wishlist'), 'updateWishlistUI')
    .addItem(getText('update_subscription_list'), 'updateSubscriptionListUI')
    .addItem(getText('change_bearer_token'), 'openBearerTokenDialogUI')
    .addToUi();
}

function updateAllUI() {
  try {
    updateWishlist();
    updateSubscriptionList();
  } catch (error) {
    handleError(error);
  }
}

function updateWishlistUI() {
  try {
    updateWishlist();
  } catch (error) {
    handleError(error);
  }
}

function updateSubscriptionListUI() {
  try {
    updateSubscriptionList();
  } catch (error) {
    handleError(error);
  }
}

function openBearerTokenDialogUI() {
  try {
    openBearerTokenDialog();
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  var ui = SpreadsheetApp.getUi();
  ui.alert(error);
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