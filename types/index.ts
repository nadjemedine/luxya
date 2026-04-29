export interface LocalizedString {
  fr: string;
  ar: string;
}

export interface Product {
  _id: string;
  _type: 'product';
  name: LocalizedString;
  slug: { current: string };
  description: LocalizedString;
  price: number;
  comparePrice?: number;
  currency: string;
  images: any[];
  category: Category;
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  stockQuantity?: number;
  variants?: { color?: string; size?: string; quantity?: number; lowStockThreshold?: number }[];
  isFeatured: boolean;
  isNew: boolean;
  isSale: boolean;
}

export interface Category {
  _id: string;
  _type: 'category';
  name: LocalizedString;
  slug: { current: string };
  description?: LocalizedString;
  image?: any;
  order?: number;
}

export interface Banner {
  _id: string;
  _type: 'banner';
  title: LocalizedString;
  subtitle?: LocalizedString;
  image: any;
  image2?: any;
  link?: string;
  buttonText?: LocalizedString;
  active: boolean;
  order?: number;
}

export interface Settings {
  _id: string;
  storeName: string;
  logo?: any;
  announcementBar: {
    text: LocalizedString;
    active: boolean;
    bgColor?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  shippingInfo?: {
    freeShippingThreshold?: number;
    standardShippingPrice?: number;
  };
}

export type Lang = 'fr' | 'ar';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}
