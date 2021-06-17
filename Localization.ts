let en = {
    bearer_token_not_exist: 'Bearer Token does not exist, please change token at "Udemy -> Change Bearer Token"',
    change_bearer_token: 'Change Bearer Token',
    completion_ratio: 'Completion Ratio',
    content_length: 'Content Length',
    enter_bearer_token: 'Enter Bearer token',
    enter_bearer_token_current_token_is: 'Enter Bearer token, current token is: ',
    is_draft: 'Is Draft',
    last_update: 'Last Update',
    lectures: 'Lectures',
    price: 'Price',
    rating: 'Rating',
    reviews: 'Reviews',
    subscribers: 'Subscribers',
    subscription: 'Subscription',
    title: 'Title',
    token_changed: 'Token changed',
    update_all: 'Update All',
    update_subscription_list: 'Update Subscription List',
    update_wishlist: 'Update Wishlist',
    url: 'Url',
    wishlist: 'Wishlist',
};

let tr = {
    bearer_token_not_exist: 'Bearer Jetonu bulunmuyor, lütfen "Udemy -> Bearer Jetonunu Güncelle" ile jeton değiştirin',
    change_bearer_token: 'Bearer Jetonunu Güncelle',
    completion_ratio: 'Tamamlama Yüzdesi',
    content_length: 'İçerik Uzunluğu',
    enter_bearer_token: 'Bearer jetonunu girin',
    enter_bearer_token_current_token_is: 'Bearer jetonunu girin, mevcut jeton: ',
    is_draft: 'Taslak mı?',
    last_update: 'Son Güncelleme',
    lectures: 'Dersler',
    price: 'Fiyat',
    rating: 'Puan',
    reviews: 'Değerlendirme',
    subscribers: 'Kayıtlı Öğrenci',
    subscription: 'Kurslarım',
    title: 'Başlık',
    token_changed: 'Jeton değişti',
    update_all: 'Tümünü Güncelle',
    update_subscription_list: 'Kurslarımı Güncelle',
    update_wishlist: 'İstek Listesini Güncelle',
    url: 'Url',
    wishlist: 'İstek Listesi',
};

function getText(key: string) {
  const language = getCurrentUserLanguage();
  const resource = getResource(language);
  return resource[key];
}

function getResource(language: string) {
    if (language === 'tr') {
        return tr;
    } else {
        return en;
    }
}

function getCurrentUserLanguage() {
    return Session.getActiveUserLocale();
}
