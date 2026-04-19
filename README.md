# 🛍️ Luxya Boutique — Next.js + Sanity

## ✨ المميزات
- 🌍 ثنائي اللغة (عربية + فرنسية) مع RTL كامل
- 🎨 تصميم راقٍ بألوان الأوبارجين #4a1942
- 📢 شريط إعلانات متحرك
- 🗂️ Sidebar منزلقة مع تبديل اللغة
- 🔍 بحث فوري في المنتجات
- 🛒 سلة تسوق مع درج جانبي
- ❤️ قائمة المفضلة مع localStorage
- 📦 Sanity Studio كامل على `/studio`

## 🚀 التشغيل
```bash
npm install
npm run dev
```
- المتجر: http://localhost:3000
- Studio: http://localhost:3000/studio

## 🗂️ Sanity Schemas
| Schema | الوصف |
|--------|-------|
| product | المنتجات — اسم ثنائي اللغة، سعر، صور، مقاسات، ألوان |
| category | الفئات |
| banner | بانرات الصفحة الرئيسية |
| settings | إعدادات المتجر |
| order | الطلبات |
| review | التقييمات |
| promo | كوبونات الخصم |

## 🎨 الألوان
- Aubergine: `#4a1942` — الهيدر والشريط السفلي
- Blanc: `#ffffff` — الخلفية
- Noir: `#0a0a0a` — الأزرار
- Or: `#c9a96e` — التفاصيل الذهبية

## Vercel Deployment
```bash
npm run build
vercel --prod
```
