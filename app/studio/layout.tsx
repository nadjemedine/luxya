import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Luxya Boutique — Studio',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            margin: 0 !important;
            padding: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          #__next {
            margin: 0 !important;
            padding: 0 !important;
          }
        `
      }} />
      {children}
    </div>
  );
}
