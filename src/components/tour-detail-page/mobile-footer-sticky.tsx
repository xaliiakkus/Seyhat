import priceFormat from "@/helpers/priceFormat";
import { getCookie } from "cookies-next";

export default function MobileFooterSticky({
  prices,
  departureType,
  roomType,
  availabilityLoading,
}: {
  prices: any;
  departureType: string;
  roomType: string;
  availabilityLoading: any;
}) {
  return (
    <div className="card card-body p-1 border-0 border-top rounded-0 fixed-bottom d-lg-none">
      <div className="row align-items-center">
        {availabilityLoading ? (
          <div className="col-6">
            <div className="placeholder-glow text-center">
              <h6 className="card-title placeholder-glow">
                <span className="placeholder placeholder-sm col-4"></span>
              </h6>
              <h5 className="card-title placeholder-glow">
                <span className="placeholder placeholder-sm col-7"></span>
              </h5>
            </div>
          </div>
        ) : (
          <div className="col-6">
            {prices.is_regular && prices.regular_price > 0 && (
              <div className="row">
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
                  <span className="h6">
                    {priceFormat({
                      amount: prices.regular_price,
                      currency: getCookie("currency"),
                    })}{" "}
                    / regular
                  </span>
                </div>
              </div>
            )}
            {prices.is_private && prices.private_price > 0 && (
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
                  <span className="h6">
                    {priceFormat({
                      amount: prices.private_price,
                      currency: getCookie("currency"),
                    })}{" "}
                    / private
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="col-6">
          <a href="#availability" className="btn btn-sm btn-primary w-100 mb-2">
            Check Availability
          </a>
          <button
            className="btn btn-sm btn-outline-primary w-100"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#inquiryFormModal"
          >
            Ask a Question
          </button>
        </div>
      </div>
    </div>
  );
}
