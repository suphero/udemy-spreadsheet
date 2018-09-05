var en = {
    title: 'Title',
    url: 'Url',
    lectures: 'Lectures',
    content_length: 'Content Length',
    last_update: 'Last Update',
    subscribers: 'Subscribers',
    reviews: 'Reviews',
    rating: 'Rating',
    completion_ratio: 'Completion Ratio',
    is_draft: 'Is Draft',
    price: 'Price',

    wishlist: 'Wishlist',
    subscription: 'Subscription',

    update_all: 'Update All',
    update_wishlist: 'Update Wishlist',
    update_subscription_list: 'Update Subscription List',
    change_bearer_token: 'Change Bearer Token',

    bearer_token_not_exist: 'Bearer Token does not exist, please change token at "Udemy -> Change Bearer Token"',
    enter_bearer_token: 'Enter Bearer token',
    enter_bearer_token_current_token_is: 'Enter Bearer token, current token is: ',
    token_changed: "Token changed"
};

var tr = {
    title: 'Başlık',
    url: 'Url',
    lectures: 'Dersler',
    content_length: 'İçerik Uzunluğu',
    last_update: 'Son Güncelleme',
    subscribers: 'Kayıtlı Öğrenci',
    reviews: 'Değerlendirme',
    rating: 'Puan',
    completion_ratio: 'Tamamlama Yüzdesi',
    is_draft: 'Taslak mı?',
    price: 'Fiyat',

    wishlist: 'İstek Listesi',
    subscription: 'Kurslarım',

    update_all: 'Tümünü Güncelle',
    update_wishlist: 'İstek Listesini Güncelle',
    update_subscription_list: 'Kurslarımı Güncelle',
    change_bearer_token: 'Bearer Jetonunu Güncelle',

    bearer_token_not_exist: 'Bearer Jetonu bulunmuyor, lütfen "Udemy -> Bearer Jetonunu Güncelle" menüsünden jeton tanımı yapın',
    enter_bearer_token: 'Bearer jetonunu girin',
    enter_bearer_token_current_token_is: 'Bearer jetonunu girin, mevcut jeton: ',
    token_changed: "Jeton değişti"
};

function getText(key) {
  var language = getCurrentUserLanguage();
  var resource = getResource(language);
  return resource[key];
}

function getResource(language) {
    if (language == 'tr') {
        return tr;
    } else {
        return en;
    }
}

function getCurrentUserLanguage() {
    return Session.getActiveUserLocale();
}