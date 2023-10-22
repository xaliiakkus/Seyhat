import type { Metadata } from "next";
import Page from "@/components/attractions-page/page";
import getAttractions from "@/services/attractionsPageService";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Top Tourist Attractions & Best Things to Do | TravelShop Booking",
  description:
    "Explore cultures, stunning megacities, traditional and new cuisine, sun, sand, snow sports, unique destinations, and more in our Attractions section from across eras.",
  alternates: {
    canonical: "https://travelshopbooking.com/attractions",
  },
};

export default async function AttractionsPage() {
  const attractionsData = await getAttractions({ page: 1 });
  return <Page attractionsData={attractionsData} />;
}
