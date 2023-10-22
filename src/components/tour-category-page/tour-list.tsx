"use client";
import HorizontalCard from "@/components/tour/card/horizontal-card";
import getTourPricing from "@/services/tourPricingService";
import { Key, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function TourList({ tours }: any) {
  const [priceLoading, setPriceLoading] = useState(true);
  const [prices, setPrices] = useState(
    tours.map((item: any) => {
      return {
        tourId: item.id,
        price: 0,
        oldPrice: 0,
        currency: "",
      };
    })
  );

  useEffect(() => {
    setPriceLoading(true);
    getTourPricing(
      tours.map((tour: any) => tour.id),
      getCookie("currency")
    ).then((res) => {
      setPrices(
        res.map((item: any) => {
          return {
            tourId: item.id,
            price: item.price,
            oldPrice: item.old_price,
            currency: item.currency,
          };
        })
      );
      setPriceLoading(false);
    });
  }, [tours]);

  return (
    <div className="row">
      {tours.map(
        (item: {
          key: Key | null | undefined;
          id: number;
          name: string;
          slug: string;
          image: string;
          description: string;
          defaults: any;
          routes: any;
          priceInfo: {
            price: number;
            oldPrice: number;
            currency: string;
          };
        }) => (
          <div className="col-12 col-sm-6 col-md-12 px-2" key={item.id}>
            <HorizontalCard
              key={item.id}
              id={item.id}
              name={item.name}
              slug={item.slug}
              image={item.image}
              description={item?.description}
              duration={item.defaults.duration?.days}
              destinationCount={item.routes?.length}
              priceLoading={priceLoading}
              priceInfo={prices.find((x: any) => x.tourId === item.id)}
            />
          </div>
        )
      )}
    </div>
  );
}
