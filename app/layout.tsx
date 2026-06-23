import type { Metadata } from "next";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import MaintenanceInquiry from "@/components/MaintenanceInquiry";

export const metadata: Metadata = {
  title: "Luxya Boutique",
  description: "Votre boutique de mode élégante | متجر الأزياء الأنيقة",
};

// Set to false to re-enable the store
const MAINTENANCE_MODE = true;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (MAINTENANCE_MODE) {
    return (
      <html lang="ar" dir="rtl">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="theme-color" content="#4a1942" />
        </head>
        <body style={{ backgroundColor: '#4a1942', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0, paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: '24px', maxWidth: '500px', width: '100%', margin: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', width: '100%' }}>
              <img src="/logo.png" alt="Luxya Boutique" style={{ width: '160px', height: 'auto', objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#111827', marginBottom: '16px', marginTop: 0 }}>المتجر موقف مؤقتا</h1>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '32px', lineHeight: 1.6, marginTop: 0 }}>
              سيتم اطلاق المتجر بعد بضعة ايام سنعود قريباً جداً، شكراً لتفهمكم
            </p>
            <MaintenanceInquiry />
            <div style={{ width: '64px', height: '4px', backgroundColor: '#c9a96e', margin: '0 auto 16px', borderRadius: '9999px', marginTop: '24px' }}></div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4a1942', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              Luxya Boutique
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#4a1942" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
