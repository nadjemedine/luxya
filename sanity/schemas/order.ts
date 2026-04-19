export default {
  name: 'order',
  title: 'Commande / طلب',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Numéro de commande / رقم الطلب',
      type: 'string',
    },
    {
      name: 'customer',
      title: 'Client / العميل',
      type: 'object',
      fields: [
        { name: 'name', title: 'Nom / الاسم', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Téléphone / الهاتف', type: 'string' },
        { name: 'address', title: 'Adresse / العنوان', type: 'text' },
        { name: 'city', title: 'Ville / المدينة', type: 'string' },
        { name: 'wilaya', title: 'Wilaya / الولاية', type: 'string' },
      ],
    },
    {
      name: 'items',
      title: 'Articles / المنتجات',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', title: 'Produit / المنتج', type: 'reference', to: [{ type: 'product' }] },
            { name: 'quantity', title: 'Quantité / الكمية', type: 'number' },
            { name: 'size', title: 'Taille / المقاس', type: 'string' },
            { name: 'color', title: 'Couleur / اللون', type: 'string' },
            { name: 'price', title: 'Prix / السعر', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Statut / الحالة',
      type: 'string',
      options: {
        list: [
          { title: 'En attente / قيد الانتظار', value: 'pending' },
          { title: 'Confirmée / مؤكد', value: 'confirmed' },
          { title: 'En préparation / قيد التحضير', value: 'processing' },
          { title: 'Expédiée / تم الشحن', value: 'shipped' },
          { title: 'Livrée / تم التسليم', value: 'delivered' },
          { title: 'Annulée / ملغى', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'paymentMethod',
      title: 'Méthode de paiement / طريقة الدفع',
      type: 'string',
      options: {
        list: [
          { title: 'Paiement à la livraison / الدفع عند الاستلام', value: 'cod' },
          { title: 'Virement bancaire / تحويل بنكي', value: 'bank_transfer' },
        ],
      },
    },
    {
      name: 'notes',
      title: 'Notes / ملاحظات',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Date de création / تاريخ الإنشاء',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customer.name',
    },
  },
};
