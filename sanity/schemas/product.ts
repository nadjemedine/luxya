export default {
  name: 'product',
  title: 'Produit / منتج',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom / الاسم',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.fr' },
    },
    {
      name: 'description',
      title: 'Description / الوصف',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'ar', title: 'العربية', type: 'text' },
      ],
    },
    {
      name: 'price',
      title: 'Prix / السعر',
      type: 'number',
    },
    {
      name: 'comparePrice',
      title: 'Prix barré / السعر الأصلي',
      type: 'number',
    },
    {
      name: 'currency',
      title: 'Devise / العملة',
      type: 'string',
      options: {
        list: [
          { title: 'DZD - دينار جزائري', value: 'DZD' },
          { title: 'EUR - يورو', value: 'EUR' },
          { title: 'USD - دولار', value: 'USD' },
        ],
      },
      initialValue: 'DZD',
    },
    {
      name: 'images',
      title: 'Images / الصور',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'category',
      title: 'Catégorie / الفئة',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'tags',
      title: 'Tags / الوسوم',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'sizes',
      title: 'Tailles / المقاسات',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'colors',
      title: 'Couleurs / الألوان',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom / الاسم', type: 'string' },
            { name: 'hex', title: 'Couleur hex', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'inStock',
      title: 'En stock / في المخزون',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'stockQuantity',
      title: 'Quantité en stock / الكمية',
      type: 'number',
    },
    {
      name: 'isFeatured',
      title: 'Produit vedette / منتج مميز',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isNew',
      title: 'Nouveau / جديد',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isSale',
      title: 'En solde / تخفيض',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name.fr',
      media: 'images.0',
    },
  },
};
