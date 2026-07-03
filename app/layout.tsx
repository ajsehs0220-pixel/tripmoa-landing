import type { Metadata } from "next";
import Script from "next/script";
import { mungyeongGamhong } from "@/lib/fonts";
import "./globals.css";

const GA_ID = "G-EXXRWBVXCW";

export const metadata: Metadata = {
  title: "트립모아 - 일본 여행 후기, AI가 한눈에",
  description:
    "카페에 흩어진 일본 여행 후기를 AI가 정리해드려요. 출처 링크 포함. 곧 오픈합니다.",
  openGraph: {
    title: "트립모아 - 일본 여행 후기, AI가 한눈에",
    description: "검색은 그만. 진짜 후기만 모았어요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={mungyeongGamhong.variable}>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xg6qrs1cvm");`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4582857182037515');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}