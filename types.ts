export interface IPriceDetail {
  amount: number;
  currency: string;
  price_string: string;
  currency_symbol: string;
}

export interface IPrice {
  amount: number;
  currency: string;
  price_string: string;
  currency_symbol: string;
}

export interface IDiscount {
  price_serve_tracking_id: string;
  price: IPrice;
  has_discount_saving: boolean;
  discount_percent: number;
  discount_percent_for_display: number;
  code: string;
  is_public: boolean;
}

export interface IWishlistedCourse {
  _class: string;
  id: number;
  title: string;
  url: string;
  is_paid: boolean;
  price: string;
  price_detail: IPriceDetail;
  price_serve_tracking_id: string;
  image_125_H: string;
  image_480x270: string;
  tracking_id: string;
  num_subscribers: number;
  discount: IDiscount;
  rating: number;
  num_reviews: number;
  num_published_lectures: number;
  estimated_content_length: number;
  last_update_date: string;
}

export interface ISubscribedCourse {
  _class: string;
  id: number;
  title: string;
  url: string;
  num_subscribers: number;
  rating: number;
  num_reviews: number;
  completion_ratio: number;
  num_lectures: number;
  estimated_content_length: number;
  last_update_date: string;
  is_draft: boolean;
}

export class WishlistEntity {
  course: IWishlistedCourse;

  constructor(course: IWishlistedCourse) {
    this.course = course;
  }

  public getRow(): any[] {
    return [
      this.course.title,
      this.course.url,
      this.course.num_published_lectures,
      this.course.estimated_content_length,
      this.course.last_update_date,
      this.course.num_subscribers,
      this.course.num_reviews,
      this.course.rating,
      this.course.discount?.price?.amount || this.course.price_detail?.amount,
    ]
  }
}

export class SubscriptionEntity {
  course : ISubscribedCourse;

  constructor(course: ISubscribedCourse) {
    this.course = course;
  }

  public getRow(): any[] {
    return [
      this.course.title,
      this.course.url,
      this.course.num_lectures,
      this.course.estimated_content_length,
      this.course.last_update_date,
      this.course.num_subscribers,
      this.course.num_reviews,
      this.course.rating,
      this.course.completion_ratio,
      this.course.is_draft,
    ];
  }
}
