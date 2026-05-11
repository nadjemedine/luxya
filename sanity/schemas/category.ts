export default {
  name: 'category',
  title: 'Catégorie / فئة',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: 'name.fr', media: 'image' },
  },
};
