import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_RECIPIENTS = ['ouasssimtahi@gmail.com'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'الاسم والرسالة مطلوبان' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: 'Tajawal', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; direction: rtl; text-align: right;">
        <h2 style="color: #4a1942; border-bottom: 2px solid #4a1942; padding-bottom: 10px;">تساؤل جديد من زبون - Luxya Boutique</h2>
        
        <div style="margin: 20px 0; background: #faf8f9; padding: 16px; border-radius: 8px;">
          <p style="margin: 8px 0;"><strong>الاسم:</strong> ${name}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333;">الرسالة:</h3>
          <p style="background: #f5f3f4; padding: 16px; border-radius: 8px; line-height: 1.8;">${message}</p>
        </div>

        <p style="color: #9e9299; font-size: 12px; margin-top: 20px;">تم إرسال هذا التساؤل من صفحة الصيانة الخاصة بالمتجر</p>
      </div>
    `;

    const recipients = Array.from(
      new Set([
        ...(process.env.RESEND_TO || '').split(',').map((email) => email.trim()).filter(Boolean),
        ...NOTIFICATION_RECIPIENTS,
      ]),
    );

    await resend.emails.send({
      from: `Luxya Boutique <${process.env.RESEND_FROM}>`,
      to: recipients,
      subject: `تساؤل جديد من ${name} - Luxya Boutique`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry Error:', error);
    return NextResponse.json(
      { success: false, error: 'فشل في إرسال التساؤل' },
      { status: 500 }
    );
  }
}
