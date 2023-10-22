import type { Metadata } from "next";
import Page from "@/components/checkout-page/page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Checkout | TravelShop Booking",
  robots: "noindex",
  alternates: {
    canonical: "https://travelshopbooking.com",
  },
};

export default function CheckoutPage() {
  return <Page />;
}
