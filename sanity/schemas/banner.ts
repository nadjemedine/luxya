export default {
  name: 'banner',
  title: 'Bannière / بانر',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre / العنوان',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    },
    {
      name: 'subtitle',
      title: 'Sous-titre / العنوان الفرعي',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Lien / الرابط',
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Texte du bouton / نص الزر',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    },
    {
      name: 'active',
      title: 'Actif / نشط',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Ordre / الترتيب',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'title.fr', media: 'image' },
  },
};
