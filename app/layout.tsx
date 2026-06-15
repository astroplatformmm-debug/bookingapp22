import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css'; // keep your existing global styles import

export const metadata: Metadata = {
  title: 'OMKKAAR Astroworld — Kundali Consultation ₹199',
  description: 'Career, Marriage aur Finance ka Kundali Vishleshan sirf ₹199 mein. Pt. Mukesh Ravindra Gupta ke saath — 25+ years experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head />
      <body>
        {children}

        {/* ── Facebook Pixel ── */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4351165591761590');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4351165591761590&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* ── End Facebook Pixel ── */}
      </body>
    </html>
  );
}
