export default {
  name: 'settings',
  title: 'Paramètres / الإعدادات',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'storeName',
      title: 'Nom du magasin / اسم المتجر',
      type: 'string',
      initialValue: 'Luxya Boutique',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'announcementBar',
      title: 'Barre d\'annonce / شريط الإعلان',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texte / النص',
          type: 'object',
          fields: [
            { name: 'fr', title: 'Français', type: 'string' },
            { name: 'ar', title: 'العربية', type: 'string' },
          ],
        },
        { name: 'active', title: 'Actif / نشط', type: 'boolean', initialValue: true },
        { name: 'bgColor', title: 'Couleur fond / لون الخلفية', type: 'string' },
      ],
    },
    {
      name: 'contact',
      title: 'Contact / التواصل',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Téléphone / الهاتف', type: 'string' },
        { name: 'address', title: 'Adresse / العنوان', type: 'text' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
      ],
    },
    {
      name: 'shippingInfo',
      title: 'Livraison / الشحن',
      type: 'object',
      fields: [
        { name: 'freeShippingThreshold', title: 'Seuil livraison gratuite / حد الشحن المجاني', type: 'number' },
        { name: 'standardShippingPrice', title: 'Prix livraison standard / سعر الشحن العادي', type: 'number' },
      ],
    },
    {
      name: 'footerText',
      title: 'Texte pied de page / نص التذييل',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    },
  ],
};
