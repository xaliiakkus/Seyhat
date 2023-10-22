import type { Metadata } from "next";
import Page from "@/components/home-page/page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "TravelShop Booking: Adventure Travel & Holidays for Groups",
  description:
    "Welcome to the official website of the world&#39;s largest adventure travel company. The best small-group &amp; private tours, safaris, expeditions, and more are just what you&#39;re looking for.",
  alternates: {
    canonical: "https://travelshopbooking.com",
  },
};

async function getFeaturedTours() {
  const res = await fetch(
    "https://apiv2.travelshopbooking.com/rest/b2c/tours/search?filters=id,name,media.collection_name,media.high,media.resize_url,slug,category.name,promotion,rating,currency,price,old_price,reviews_count,duration,image,hasPromotion&destination=global&promotion_type=discount_all&order=promotions_value&order_dir=desc&page_size=10&pax=2&activeCurrency=EUR&price[]=0&price[]=25000&duration[]=1&duration[]=30&aggregation[]=category.slug.keyword;category.name.en.keyword&nuxtroute=getFeatured",
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Content-Language": "en",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Origin: "https://travelshopbooking.com",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Home() {
  const data = await getFeaturedTours();

  return <Page featuredTours={data} />;
}
