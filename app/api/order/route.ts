import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { ecotrack } from '@/lib/ecotrack';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, cart, cartTotal, shippingFee } = body;

    const itemsHtml = cart.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.product.name.fr}</strong><br/>
          <small>Taille: ${item.size || 'N/A'}, Couleur: ${item.color || 'N/A'}</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.product.price * item.quantity} DZD</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #611b42; border-bottom: 2px solid #611b42; padding-bottom: 10px;">Nouvelle commande - Luxya Boutique</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Informations Client</h3>
          <p><strong>Nom:</strong> ${formData.fullName}</p>
          <p><strong>Téléphone:</strong> ${formData.phone}</p>
          <p><strong>Adresse:</strong> Wilaya: ${formData.wilaya}, Commune: ${formData.commune}${formData.address ? `<br/>Détails: ${formData.address}` : ''}</p>
          <p><strong>Type de livraison:</strong> ${formData.deliveryType === 'home' ? 'Domicile' : 'Bureau (Stop Desk)'}</p>
          ${formData.center_id ? `<p><strong>ID Bureau:</strong> ${formData.center_id}</p>` : ''}
        </div>

        <h3 style="color: #333;">Détails de la commande</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f9f9f9;">
              <th style="padding: 10px; text-align: left;">Produit</th>
              <th style="padding: 10px; text-align: center;">Qté</th>
              <th style="padding: 10px; text-align: right;">Prix</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right;">Sous-total</td>
              <td style="padding: 10px; text-align: right;">${cartTotal - shippingFee} DZD</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right;">Livraison</td>
              <td style="padding: 10px; text-align: right;">${shippingFee} DZD</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 15px 10px; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 15px 10px; text-align: right; font-weight: bold; color: #611b42; font-size: 18px;">${cartTotal} DZD</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    // 1. Send Email Notification
    await resend.emails.send({
      from: `Luxya Boutique <${process.env.RESEND_FROM}>`,
      to: (process.env.RESEND_TO || '').split(','),
      subject: `Nouvelle Commande de ${formData.fullName} - ${cartTotal} DZD`,
      html: emailHtml,
    });

    // 2. Create Order in EcoTrack
    try {
      const ecotrackOrder = {
        nom_client: formData.fullName,
        telephone: formData.phone,
        adresse: formData.deliveryType === 'home' ? formData.address : `Stop Desk: ${formData.commune}`,
        commune: formData.commune,
        code_wilaya: parseInt(formData.wilaya_id),
        montant: cartTotal,
        remarque: `Type: ${formData.deliveryType === 'home' ? 'Domicile' : 'Bureau'}${formData.center_id ? `, Office ID: ${formData.center_id}` : ''}`,
        produits: cart.map((item: any) => `${item.product.name.fr} (x${item.quantity})`).join(', '),
        stop_desk: formData.deliveryType === 'office' ? 1 : 0,
        type: 1, // 1 for standard delivery
      };

      await ecotrack.createOrder(ecotrackOrder);
    } catch (ecotrackError) {
      console.error('EcoTrack Integration Error:', ecotrackError);
      // We don't fail the whole request if EcoTrack fails, but we should log it.
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process order' }, { status: 500 });
  }
}
