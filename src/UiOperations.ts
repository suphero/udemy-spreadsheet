import { getToken, setToken } from './Common';
import { updateSubscriptionList } from './Subscription';
import { updateWishlist } from './Wishlist';

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Udemy')
    .addItem(getText('update_all'), updateAllUI.name)
    .addSeparator()
    .addItem(getText('update_wishlist'), updateWishlistUI.name)
    .addItem(getText('update_subscription_list'), updateSubscriptionListUI.name)
    .addItem(getText('change_bearer_token'), openBearerTokenDialogUI.name)
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
  const ui = SpreadsheetApp.getUi();
  ui.alert(error);
}

function openBearerTokenDialog() {
  const ui = SpreadsheetApp.getUi();
  const oldToken = getToken();
  let message: string;
  if (oldToken) {
    message = getText('enter_bearer_token_current_token_is') + oldToken;
  } else {
    message = getText('enter_bearer_token');
  }

  const result = ui.prompt(message);
  const button = result.getSelectedButton();
  const newToken = result.getResponseText();

  if (button === ui.Button.OK) {
    setToken(newToken);
    ui.alert(getText('token_changed'));
  }
}
