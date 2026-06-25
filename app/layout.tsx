import type { Metadata } from "next";
import Script from "next/script";
import { mungyeongGamhong } from "@/lib/fonts";
import "./globals.css";

// GA4 측정 ID
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
      </body>
    </html>
  );
}