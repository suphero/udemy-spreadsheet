function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Udemy')
    .addItem('Update All', 'updateAll')
    .addSeparator()
    .addItem('Update Wishlist', 'updateWishlist')
    .addItem('Update Subscription List', 'updateSubscriptionList')
    .addItem('Change Bearer Token', 'openBearerTokenDialog')
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
    message = "Enter your Bearer token, your current token is: " + oldToken;
  } else {
    message = "Enter your Bearer token";
  }
  
  var result = ui.prompt(message);
  var button = result.getSelectedButton();
  var newToken = result.getResponseText();
  
  if (button == ui.Button.OK) {

    setToken(newToken);
    ui.alert('Your token changed from "' + oldToken + '" to "' + newToken + '".');
  }
}