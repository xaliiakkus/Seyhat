import type { Metadata } from "next";
import Page from "@/components/search-page/page";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Results | TravelShop Booking",
  description:
    "Search for tours, destinations and activities in TravelShop Booking website!",
  robots: "noindex",
  alternates: {
    canonical: "https://travelshopbooking.com/",
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.term || searchParams.term == "") return notFound();

  return <Page term={searchParams.term} />;
}
