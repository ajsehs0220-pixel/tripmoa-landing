import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "트립모아 - 일본 여행 후기, AI가 한눈에",
  description:
    "네이버 카페에 흩어진 일본 여행 후기를 AI가 정리해드려요. 출처 링크 포함. 곧 오픈합니다.",
  // SNS 공유 시 미리보기 (인스타 바이오 링크 대응)
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
    <html lang="ko">
      <body>
        {children}

        {/* ===================================================================
            GA4 추적 코드 자리 (인스타 오픈 시점에 활성화)
            - 측정 ID(G-XXXXXXX) 발급 후 아래 주석 해제
            - UTM 파라미터는 자동 수집됨 (코드 추가 불필요)

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>
            =================================================================== */}
      </body>
    </html>
  );
}
