"use client";
import priceFormat from "@/helpers/priceFormat";
import { getCookie } from "cookies-next";

export default function Availability({
  data,
  slug,
  serviceType,
  travelers,
}: {
  data: any;
  slug: string;
  serviceType: any;
  travelers: number;
}) {
  const getFullDate = (date: string) => {
    var createNewDateItem = new Date(date);
    return (
      createNewDateItem.toLocaleString("en-US", {
        month: "short",
      }) +
      " " +
      createNewDateItem.getDate() +
      ", " +
      createNewDateItem.getFullYear()
    );
  };

  return (
    <div className="row m-0">
      <div className="col-12 p-0">
        {data.prices.map((item: any) => (
          <div key={item.id}>
            {item.dates.map((date: any, index: number) => {
              var price =
                serviceType == "regular"
                  ? date.prices.regular_price
                  : date.prices.private_price;
              var oldPrice =
                serviceType == "regular"
                  ? date.prices.old_regular_price
                  : date.prices.old_private_price;

              if (price == 0) return null;

              return (
                <div className="card mt-2 border-light-subtle" key={index}>
                  <div className="card-body">
                    <div className="row m-0 gy-3 gy-md-0">
                      <div className="col-4 col-md-3 m-0">
                        <small>
                          <strong>STARTS</strong>
                        </small>
                        <br />
                        {getFullDate(date.start)}
                      </div>
                      <div className="col-4 col-md-3 m-0">
                        <small>
                          <strong>ENDS</strong>
                        </small>
                        <br />
                        {getFullDate(date.end)}
                      </div>
                      <div className="col-4 col-md-3 m-0 align-self-center text-center">
                        {((serviceType == "regular" &&
                          date.prices.old_regular_price > 0 &&
                          date.prices.regular_price !==
                            date.prices.old_regular_price) ||
                          (serviceType == "private" &&
                            date.prices.old_private_price > 0 &&
                            date.prices.private_price !==
                              date.prices.old_private_price)) && (
                          <small>
                            <span className="text-decoration-line-through text-danger">
                              {priceFormat({
                                amount: oldPrice,
                                currency: getCookie("currency"),
                              })}
                            </span>
                            <br />
                          </small>
                        )}
                        <span className="h5">
                          {priceFormat({
                            amount: price,
                            currency: getCookie("currency"),
                          })}
                        </span>
                      </div>
                      <div className="col-12 col-md-3 align-self-center text-center">
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          role="button"
                          onClick={(event) => {
                            event.preventDefault();
                            window.open(
                              `/checkout?slug=${slug}&date=${date.start}&service-type=${serviceType}&pax=${travelers}`,
                              "_blank"
                            );
                          }}
                        >
                          Select Date
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
