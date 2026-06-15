// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Book an Appointment',
  description: 'Book your consultation appointment online — secure, easy, instant confirmation.',
  openGraph: {
    title: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Book an Appointment',
    description: 'Book your consultation appointment online.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://checkout.razorpay.com" />

        {/* ───────────── Meta Pixel ───────────── */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4351165591761590');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4351165591761590&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* ──────────────────────────────────── */}

      </head>
      <body className="font-body bg-cream antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1b2a5c',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#E8A020', secondary: '#1b2a5c' } },
          }}
        />
      </body>
    </html>
  );
}
