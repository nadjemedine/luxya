import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, cart, cartTotal } = body;

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
          <p><strong>Adresse:</strong> Wilaya ${formData.wilaya}, Commune ${formData.municipality}${formData.address ? `<br/>Détails: ${formData.address}` : ''}</p>
          <p><strong>Type de livraison:</strong> ${formData.deliveryType === 'home' ? 'Domicile' : 'Bureau'}</p>
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
              <td colspan="2" style="padding: 15px 10px; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 15px 10px; text-align: right; font-weight: bold; color: #611b42; font-size: 18px;">${cartTotal} DZD</td>
            </tr>
          </tfoot>
        </table>
        
        <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
          Cette commande a été passée depuis le site luxya.shop
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: `Luxya Boutique <${process.env.RESEND_FROM}>`,
      to: (process.env.RESEND_TO || '').split(','),
      subject: `Nouvelle Commande de ${formData.fullName} - ${cartTotal} DZD`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
