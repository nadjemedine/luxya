import { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('لوحة التحكم')
    .items([
      // Products - First and most prominent
      S.listItem()
        .title('🛍️ المنتجات')
        .schemaType('product')
        .child(S.documentTypeList('product').title('المنتجات')),
      
      // Categories
      S.listItem()
        .title('📂 الفئات')
        .schemaType('category')
        .child(S.documentTypeList('category').title('الفئات')),
      
      // Banners
      S.listItem()
        .title('🖼️ البانرات')
        .schemaType('banner')
        .child(S.documentTypeList('banner').title('البانرات')),
      
      // Divider
      S.divider(),
      
      // Orders
      S.listItem()
        .title('📦 الطلبات')
        .schemaType('order')
        .child(S.documentTypeList('order').title('الطلبات')),
      
      // Reviews
      S.listItem()
        .title('⭐ التقييمات')
        .schemaType('review')
        .child(S.documentTypeList('review').title('التقييمات')),
      
      // Promos
      S.listItem()
        .title('🎟️ كوبونات الخصم')
        .schemaType('promo')
        .child(S.documentTypeList('promo').title('كوبونات الخصم')),
      
      // Divider
      S.divider(),
      
      // Settings
      S.listItem()
        .title('⚙️ الإعدادات')
        .schemaType('settings')
        .child(
          S.documentList()
            .schemaType('settings')
            .title('إعدادات المتجر')
            .filter('_type == "settings"')
        ),
    ]);
