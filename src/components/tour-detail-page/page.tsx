"use client";
import { useEffect, useState, useRef } from "react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import getTourAvailability from "@/services/tourAvailability";
import getTourAvailabilityMonths from "@/services/tourAvailabilityMonths";
import Breadcrumb from "../header/breadcrumb";
import ImageCarousel from "./image-carousel";
import PriceSide from "./price-side/price-side";
import PriceSideSkeleton from "./price-side/skeleton";
import Availability from "./availability";
import AvailabilityFilter from "./availability-filter";
import InquiryModal from "./inquiry-modal";
import MobileFooterSticky from "./mobile-footer-sticky";

export default function TourDetailPage({
  tourData,
  breadcrumb,
}: {
  tourData: any;
  breadcrumb: any;
}) {
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [availabilityPriceLoading, setAvailabilityPriceLoading] =
    useState(true);
  const [prices, setPrices] = useState({});
  const [departureMonths, setDepartureMonths] = useState({});
  const [availabilityFilters, setAvailabilityFilters] = useState({
    serviceType: tourData.is_regular ? "regular" : "private",
    travelers: 1,
    departureMonth: "nodate",
  });
  const isInitialMount = useRef(true);

  const fetchAvailabilityDates = () => {
    setAvailabilityPriceLoading(true);
    getTourAvailability({
      tourSlug: tourData.slug,
      date: availabilityFilters.departureMonth,
      pax: availabilityFilters.travelers,
      activeCurrency: getCookie("currency"),
      serviceType: null,
    }).then((availabilityRes) => {
      setPrices(availabilityRes);
      setAvailabilityLoading(false);
      setAvailabilityPriceLoading(false);
    });
  };

  useEffect(() => {
    getTourAvailabilityMonths({
      tourId: tourData.id,
    }).then((monthsRes) => {
      setDepartureMonths(monthsRes);
      setAvailabilityFilters({
        ...availabilityFilters,
        departureMonth: monthsRes[0],
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else fetchAvailabilityDates();
  }, [availabilityFilters.departureMonth, availabilityFilters.travelers]); // eslint-disable-line react-hooks/exhaustive-deps

  const duration = tourData.duration == "1 days" ? "daily" : tourData.duration;

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[
            ...breadcrumb,
            { pageTitle: tourData.name, pageUrl: `/tour/${tourData.slug}` },
          ]}
        />
        <h1 className="h3">{tourData.name}</h1>
        {tourData.startLocation == tourData.endLocation ? (
          <p>
            In <strong>{tourData.startLocation}</strong>, {duration}
          </p>
        ) : (
          <p>
            From <strong>{tourData.startLocation}</strong> to{" "}
            <strong>{tourData.endLocation}</strong>, {duration}
          </p>
        )}
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="row">
              <div className="col-12">
                <ImageCarousel images={tourData.media} />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12">
                <div className="card border-light-subtle my-3">
                  <div className="card-body">
                    <h2 className="card-title h4 pb-2">Tour Overview</h2>
                    <div className="row">
                      <div className="col-6 col-sm-3">
                        <strong>Tour Language(s):</strong>
                        <br />
                        {tourData.languages.map((item: any) => item.name + " ")}
                      </div>
                      {tourData.guideType && (
                        <div className="col-6 col-sm-3">
                          <strong>Guiding Type:</strong>
                          <br />
                          {tourData.guideType}
                        </div>
                      )}
                      <div className="col-6 col-sm-3">
                        <strong>Group Size:</strong>
                        <br />
                        {tourData.groupSizeMin} - {tourData.groupSizeMax}
                      </div>
                      {tourData.budgetClass && (
                        <div className="col-6 col-sm-3">
                          <strong>Budget Class:</strong>
                          <br />
                          {tourData.budgetClass}
                        </div>
                      )}
                      {tourData.physicalRating && (
                        <div className="col-6 col-sm-3">
                          <strong>Physical Rating:</strong>
                          <br />
                          {tourData.physicalRating}
                        </div>
                      )}
                      {tourData.suitableAges &&
                        tourData.suitableAges != "0 - 0" && (
                          <div className="col-6 col-sm-3">
                            <strong>Suitable Ages:</strong>
                            <br />
                            {tourData.suitableAges}
                          </div>
                        )}
                      {tourData.pickupLocation && (
                        <div className="col-6 col-sm-3">
                          <strong>Pickup Location:</strong>
                          <br />
                          {tourData.pickupLocation}
                        </div>
                      )}
                      {tourData.pickupTime && (
                        <div className="col-6 col-sm-3">
                          <strong>Pickup Time:</strong>
                          <br />
                          {tourData.pickupTime}
                        </div>
                      )}
                      {tourData.dropoffLocation && (
                        <div className="col-6 col-sm-3">
                          <strong>Dropoff Location:</strong>
                          <br />
                          {tourData.dropoffLocation}
                        </div>
                      )}
                      {tourData.dropoffTime && (
                        <div className="col-6 col-sm-3">
                          <strong>Dropoff Time:</strong>
                          <br />
                          {tourData.dropoffTime}
                        </div>
                      )}
                    </div>
                    <div
                      className="card-text mt-3"
                      dangerouslySetInnerHTML={{
                        __html: tourData.description
                          ? tourData.description
                          : "",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="card border-light-subtle my-3">
                  <div className="card-body p-1">
                    <h2 className="card-title h4 p-3">Places You&#39;ll See</h2>
                    <div
                      className="row row-cols-2 row-cols-md-3 d-flex align-items-stretch flex-row flex-nowrap"
                      style={{ overflowX: "auto" }}
                    >
                      {tourData.attractions.map((item: any) => (
                        <div className="col p-2" key={item.id}>
                          <div className="card border-0 mx-2">
                            <a
                              href={"/attractions/" + item.slug}
                              target="_blank"
                              title={item.name}
                            >
                              {item.media[0] ? (
                                <Image
                                  src={item.media[0].thumb}
                                  alt={item.name}
                                  width={400}
                                  height={300}
                                  className="img-fluid rounded mx-auto card-img-top"
                                  loading="lazy"
                                  style={{ height: "auto" }}
                                  quality={100}
                                />
                              ) : (
                                ""
                              )}
                            </a>
                            <div className="card-body p-2">
                              <h3 className="card-title h6 text-center">
                                <a
                                  href={"/attractions/" + item.slug}
                                  target="_blank"
                                  title={item.name}
                                  className="text-decoration-none text-dark"
                                >
                                  {item.name}
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card border-light-subtle my-3">
                  <div className="card-body">
                    <h2 className="card-title h4">Highlights</h2>
                    {tourData.highlights.map(
                      (item: any, index: number) =>
                        item.title +
                        (tourData.highlights.length != index + 1 ? ", " : "")
                    )}
                  </div>
                </div>

                <div className="card border-light-subtle my-3">
                  <div className="card-body p-0">
                    <h2 className="card-title h4 p-3 pb-1">Itinerary</h2>
                    <div
                      className="accordion accordion-flush"
                      id="itineraryAccordion"
                    >
                      {tourData.itineraries.map((item: any) => {
                        return (
                          <div className="accordion-item" key={item.id}>
                            <span className="accordion-header h2">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={"#itinerary-" + item.id}
                                aria-expanded="false"
                                aria-controls={"itinerary-" + item.id}
                              >
                                <span>
                                  <strong>Day {item.day}: </strong>
                                  {item.title}
                                </span>
                              </button>
                            </span>
                            <div
                              id={"itinerary-" + item.id}
                              className="accordion-collapse collapse"
                              data-bs-parent="#itineraryAccordion"
                            >
                              <div
                                className="accordion-body"
                                dangerouslySetInnerHTML={{
                                  __html: item.description
                                    ? item.description
                                    : "",
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="card border-light-subtle my-3">
                      <div className="card-body p-0">
                        <h2 className="card-title h4 p-3 pb-1">Included</h2>
                        <div
                          className="accordion accordion-flush"
                          id="includedAccordion"
                        >
                          {tourData.included.map((item: any) => {
                            return (
                              <div className="accordion-item" key={item.id}>
                                <span className="accordion-header h2">
                                  <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#included-" + item.id}
                                    aria-expanded="false"
                                    aria-controls={"included-" + item.id}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                      className="bi bi-check-circle text-success"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                    </svg>
                                    &nbsp;
                                    {item.name}
                                  </button>
                                </span>
                                <div
                                  id={"included-" + item.id}
                                  className="accordion-collapse collapse"
                                  data-bs-parent="#includedAccordion"
                                >
                                  <div
                                    className="accordion-body"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description
                                        ? item.description
                                        : "",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card border-light-subtle my-3">
                      <div className="card-body p-0">
                        <h2 className="card-title h4 p-3 pb-1">Excluded</h2>
                        <div
                          className="accordion accordion-flush"
                          id="excludedAccordion"
                        >
                          {tourData.excluded.map((item: any) => {
                            return (
                              <div className="accordion-item" key={item.id}>
                                <span className="accordion-header h2">
                                  <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#excluded-" + item.id}
                                    aria-expanded="false"
                                    aria-controls={"excluded-" + item.id}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                      className="bi bi-x-circle text-danger"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    &nbsp;
                                    {item.name}
                                  </button>
                                </span>
                                <div
                                  id={"excluded-" + item.id}
                                  className="accordion-collapse collapse"
                                  data-bs-parent="#excludedAccordion"
                                >
                                  <div
                                    className="accordion-body"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description
                                        ? item.description
                                        : "",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card border-light-subtle mt-3"
                  id="availability"
                >
                  <div className="card-body">
                    <h2 className="card-title h4">Availability</h2>
                    <div className="row col-12 mt-4 m-0 p-0">
                      {availabilityLoading ? (
                        <div className="text-center my-4">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p>Loading. Please wait.</p>
                        </div>
                      ) : (
                        <>
                          <AvailabilityFilter
                            isRegular={tourData.is_regular ? true : false}
                            isPrivate={tourData.is_private ? true : false}
                            departureMonths={departureMonths}
                            groupSizeMin={tourData.groupSizeMin}
                            groupSizeMax={tourData.groupSizeMax}
                            availabilityFilters={availabilityFilters}
                            availabilityFilterChange={(filters: any) => {
                              setAvailabilityFilters(filters);
                            }}
                          />
                          {!availabilityPriceLoading ? (
                            <Availability
                              data={prices}
                              slug={tourData.slug}
                              serviceType={availabilityFilters.serviceType}
                              travelers={availabilityFilters.travelers}
                            />
                          ) : (
                            <div className="text-center my-4">
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <p>Loading. Please wait.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card border-light-subtle my-3">
                  <div className="card-body p-0">
                    <h2 className="card-title h4 p-3 pb-1">Good To Know</h2>
                    <div
                      className="accordion accordion-flush"
                      id="goodToKnowAccordion"
                    >
                      <div className="accordion-item">
                        <span className="accordion-header h2">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#gtn-cancelation-policy"}
                            aria-expanded="false"
                            aria-controls={"gtn-cancelation-policy"}
                          >
                            <span>Cancelation Policy</span>
                          </button>
                        </span>
                        <div
                          id={"gtn-cancelation-policy"}
                          className="accordion-collapse collapse"
                          data-bs-parent="#goodToKnowAccordion"
                        >
                          <div className="accordion-body">
                            <p>
                              As a company, we are always honored to protect the
                              benefits of our business partners and guests, and
                              to always provide the best price, the best package
                              and convenience in cancellation conditions for
                              them.
                            </p>
                            <p>
                              Below cancellation policy is only for land
                              services and we will follow the cancellation
                              policy of airline companies for domestic flights.
                            </p>
                            <ul>
                              <li>
                                If the booking is canceled 8 weeks to the
                                departure you can get full refund.
                              </li>
                              <li>
                                If the booking is canceled 7 weeks to the
                                departure, we will refund 100 EUR only.
                              </li>
                              <li>
                                If the booking is canceled 3 weeks prior to the
                                departure, you will not be refunded. Under any
                                circumstances, there will be no refund for the
                                promoted tours. The balance will be identified
                                as &quot;Future Tour Credits&quot; to use in the
                                future. Please contact
                                help@travelshopbooking.com or your tour operator
                                to change tour dates and other details.
                              </li>
                            </ul>
                            <p>
                              Under any circumstances, there will be no refund
                              for the promoted tours. The balance will be
                              identified as &quot;Future Tour Credits&quot; to
                              use in the future. Please contact{" "}
                              <a
                                href="mailto:help@travelshopbooking.com"
                                target="_blank"
                              >
                                help@travelshopbooking.com
                              </a>{" "}
                              or your tour operator to change tour dates and
                              other details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 d-none d-lg-block">
            <div
              className="card border-light-subtle sticky-top"
              style={{ top: "30%" }}
            >
              <div className="card-body">
                {availabilityLoading ? (
                  <PriceSideSkeleton />
                ) : (
                  <PriceSide
                    prices={prices}
                    departureType={tourData.departure_type_id}
                    roomType={tourData.roomType}
                  />
                )}
                <hr className="my-4" />
                <span className="h5">Need help?</span>
                <p className="mt-2">
                  Please feel free to ask questions about the tour. Help desk
                  experts will respond to you as soon as possible.
                </p>
                <div className="d-grid gap-2 d-md-block mt-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#inquiryFormModal"
                  >
                    Ask a Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooterSticky
        prices={prices}
        departureType={tourData.departure_type_id}
        roomType={tourData.roomType}
        availabilityLoading={availabilityLoading}
      />
      <InquiryModal tourId={tourData.id} />
    </main>
  );
}
