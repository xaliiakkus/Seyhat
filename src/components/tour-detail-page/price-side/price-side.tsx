"use client";
import priceFormat from "@/helpers/priceFormat";
import { getCookie } from "cookies-next";

export default function PriceSide({
  prices,
  departureType,
  roomType,
}: {
  prices: any;
  departureType: string;
  roomType: string;
}) {
  return (
    <div>
      <div className="row mb-3">
        <div className="col-12">
          {departureType === "guaranteed" && (
            <span className="badge text-bg-success p-2 float-end">
              Guaranteed departure!
            </span>
          )}
        </div>
      </div>
      {prices.is_regular && (
        <div className="row mb-3">
          <div className="col-12 text-center">
            <small>
              From{" "}
              {prices.old_regular_price > 0 &&
                prices.regular_price != prices.old_regular_price && (
                  <span className="text-decoration-line-through text-danger">
                    {priceFormat({
                      amount: prices.old_regular_price,
                      currency: getCookie("currency"),
                    })}
                  </span>
                )}
            </small>
            <br />
            <span className="h5">
              {priceFormat({
                amount: prices.regular_price,
                currency: getCookie("currency"),
              })}{" "}
              / regular
            </span>
          </div>
        </div>
      )}
      {prices.is_private && (
        <div className="row">
          <div className="col-12 text-center">
            <small>
              From{" "}
              {prices.old_private_price > 0 &&
                prices.private_price != prices.old_private_price && (
                  <span className="text-decoration-line-through text-danger">
                    {priceFormat({
                      amount: prices.old_private_price,
                      currency: getCookie("currency"),
                    })}
                  </span>
                )}
            </small>
            <br />
            <span className="h5">
              {priceFormat({
                amount: prices.private_price,
                currency: getCookie("currency"),
              })}{" "}
              / private
            </span>
          </div>
        </div>
      )}
      <br />
      {roomType && <p>* Per person in a {roomType} room</p>}
      <a href="#availability" className="btn btn-primary w-100">
        Check Availability
      </a>
    </div>
  );
}
