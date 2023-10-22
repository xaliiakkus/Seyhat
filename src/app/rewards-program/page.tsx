import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Rewards Program | TravelShop Booking",
  description:
    "Our TravelShop Booking rewards program will allow you to travel more and save more as you travel. Travel and Big Save now",
  alternates: {
    canonical: "https://travelshopbooking.com/rewards-program",
  },
};

export default function RewardsProgramPage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[
            { pageTitle: "Rewards Program", pageUrl: "/rewards-program" },
          ]}
        />
        <h1 className="h3">Rewards Program</h1>
        <div className="card border-light-subtle mt-4">
          <div className="card-body">
            <p>
              TravelShopBooking is a booking platform through which customers
              can purchase experiences, tickets, tours, and travel related
              products from all around the world, offered by local as well as
              global companies.
            </p>
            <p>
              Apart from provide you the best rate and service quality, we also
              give options to get TravelShopBooking Credit for your next
              reservation. Upon your confirmation of the trip %1 of the program
              total amount will be given as a credit for your future booking.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
