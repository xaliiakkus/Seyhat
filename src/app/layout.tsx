import type { Metadata } from "next";
import Script from "next/script";
import BootstrapJs from "@/components/bootstrapJs";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "TravelShop Booking",
  description: "TravelShop Booking",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#854ec9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-body-tertiary">
        {process.env.NODE_ENV === "production" && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MHHRLZ3"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        {process.env.NODE_ENV === "production" && (
          <Script id="google-tag-manager">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MHHRLZ3');`}
          </Script>
        )}
        <Header />
        {children}
        <Footer />
      </body>
      {process.env.NODE_ENV === "production" && (
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N7Y1Z4TJNL" />
      )}
      {process.env.NODE_ENV === "production" && (
        <Script id="google-analytics">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-N7Y1Z4TJNL');
      `}
        </Script>
      )}
      <BootstrapJs />
    </html>
  );
}
