export default {
  name: 'review',
  title: 'Avis / مراجعة',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Produit / المنتج',
      type: 'reference',
      to: [{ type: 'product' }],
    },
    {
      name: 'customerName',
      title: 'Nom du client / اسم العميل',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Note / التقييم',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
    },
    {
      name: 'comment',
      title: 'Commentaire / التعليق',
      type: 'text',
    },
    {
      name: 'approved',
      title: 'Approuvé / معتمد',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'createdAt',
      title: 'Date / التاريخ',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'rating',
    },
  },
};
