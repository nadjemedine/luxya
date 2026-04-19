export default {
  name: 'promo',
  title: 'Promotion / ترويج',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Code promo / رمز الخصم',
      type: 'string',
    },
    {
      name: 'discountType',
      title: 'Type de réduction / نوع الخصم',
      type: 'string',
      options: {
        list: [
          { title: 'Pourcentage / نسبة مئوية', value: 'percentage' },
          { title: 'Montant fixe / مبلغ ثابت', value: 'fixed' },
        ],
      },
    },
    {
      name: 'discountValue',
      title: 'Valeur de réduction / قيمة الخصم',
      type: 'number',
    },
    {
      name: 'minOrderAmount',
      title: 'Montant minimum / الحد الأدنى للطلب',
      type: 'number',
    },
    {
      name: 'maxUses',
      title: 'Utilisations max / الحد الأقصى للاستخدام',
      type: 'number',
    },
    {
      name: 'usedCount',
      title: 'Fois utilisé / عدد الاستخدامات',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'validFrom',
      title: 'Valide à partir de / صالح من',
      type: 'datetime',
    },
    {
      name: 'validUntil',
      title: 'Valide jusqu\'au / صالح حتى',
      type: 'datetime',
    },
    {
      name: 'active',
      title: 'Actif / نشط',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'code' },
  },
};
