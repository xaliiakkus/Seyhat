"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import postSubscribe from "@/services/subscribe";
import getTourPricing from "@/services/tourPricingService";
import priceFormat from "@/helpers/priceFormat";
import styles from "./home.module.scss";

export default function Page({ featuredTours }: { featuredTours: any }) {
  const [priceLoading, setPriceLoading] = useState(true);
  const [prices, setPrices] = useState(
    featuredTours.tours.map((item: any) => {
      return {
        tourId: item.id,
        price: 0,
        oldPrice: 0,
        currency: "",
      };
    })
  );

  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMail, setSubscribeMail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [subscribeErrorMessage, setSubscribeErrorMessage] = useState("");
  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const subscribePost = async () => {
    if (!subscribeMail || !isEmail(subscribeMail)) {
      setSubscribeErrorMessage("Please specify an email address");
      setSubscribeStatus("error");
    } else {
      setSubscribeLoading(true);
      setSubscribeStatus("");
      await postSubscribe(subscribeMail).then((res) => {
        setSubscribeMail("");
        setSubscribeStatus("success");
        setSubscribeLoading(false);
      });
    }
  };

  useEffect(() => {
    getTourPricing(
      featuredTours.tours.map((tour: any) => tour.id),
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <div
        id="homeSlider"
        className="carousel slide mb-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              backgroundImage: "url(/images/home/sliders/image5.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "24rem",
            }}
          >
            <div className="container">
              <div
                className="carousel-caption text-start"
                style={{ bottom: "3rem", zIndex: "10" }}
              >
                <h2 className="h1">Best Travel Deals</h2>
                <p>
                  Check the deals page to find the best Europe tours and travel
                  packages for 2024,
                  <br />
                  the best Asia tour packages, luxury Africa tour packages, and
                  more.
                </p>
                <p>
                  <a
                    className="btn btn btn-light"
                    href="/worldwide-tours#promotion_type=discount_all"
                  >
                    See All Deals
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url(/images/home/sliders/image6.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "24rem",
            }}
          >
            <div className="container">
              <div
                className="carousel-caption text-start"
                style={{ bottom: "3rem", zIndex: "10" }}
              >
                <h2 className="h1">Black Friday</h2>
                <p>
                  The best Turkey tour packages for 2024 will be available with
                  the best Black Friday tour deals.
                  <br />
                  Visit Black Friday tour deals page to book the best prices of
                  the year.
                  <br />
                  <br />
                  <i>Cooming Soon</i>.
                </p>
              </div>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: "url(/images/home/sliders/image2.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "24rem",
            }}
          >
            <div className="container">
              <div
                className="carousel-caption text-start"
                style={{ bottom: "3rem", zIndex: "10" }}
              >
                <h2 className="h1">Best Turkey Tour Deals</h2>
                <p>
                  Best Turkey tours and packages on dozens of cathegories,
                  popular Turkey tourist attractions like
                  <br />
                  Cappadocia Hot Air Ballon Flight, Bosphorus Dinner Cruise and
                  Turkish night shows will amaze you.
                </p>
                <p>
                  <a
                    className="btn btn btn-light"
                    href="/turkey-tours#promotion_type=discount_all"
                  >
                    See Turkey Deals
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <h2 className="h3">Trending Travel Packages</h2>
        <p className="mb-4">
          Find your next adventure among the most booked travel packages.
        </p>
        <div
          className="row row-cols-2 row-cols-md-5 d-flex align-items-stretch flex-row flex-nowrap"
          style={{ overflowX: "auto" }}
        >
          {featuredTours.tours
            .filter((item: any, index: any) => item.id != 519)
            .filter((item: any, index: any) => index < 5)
            .map((tour: any) => {
              const priceInfo = prices.find((x: any) => x.tourId === tour.id);
              return (
                <div className="col mb-3 p-2" key={tour.id}>
                  <div className="card border-light-subtle h-100">
                    <a
                      href={"/tour/" + tour.slug}
                      title={tour.name}
                      target="_blank"
                      className="text-dark text-decoration-none"
                    >
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        width={300}
                        height={140}
                        className={`rounded-top mx-auto card-img-top ${styles.imageHeight}`} // img-fluid
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <div className="row h-100">
                        <div className="col-12 align-self-start">
                          <a
                            href={"/tour/" + tour.slug}
                            title={tour.name}
                            target="_blank"
                            className="text-dark text-decoration-none"
                          >
                            <h3 className="h6">{tour.name}</h3>
                          </a>
                        </div>
                        <div className="col-12 align-self-end">
                          <div className="row">
                            <div className="col-7 pe-0 align-self-end">
                              <p className="m-0">
                                <small>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-clock"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                  </svg>{" "}
                                  {tour.duration_days == 1
                                    ? "Daily"
                                    : tour.duration_days + " Days"}
                                </small>
                              </p>
                            </div>
                            <div className="col-5 ps-0 text-end align-self-end">
                              {priceLoading && (
                                <div className="placeholder-glow">
                                  <span className="placeholder placeholder-sm col-12"></span>
                                  <span className="placeholder placeholder-sm col-8"></span>
                                </div>
                              )}
                              {!priceLoading && priceInfo && (
                                <>
                                  <small>
                                    From{" "}
                                    <span className="text-danger">
                                      {priceInfo.oldPrice > 0 &&
                                        priceInfo.price !=
                                          priceInfo.oldPrice && (
                                          <span className="text-decoration-line-through">
                                            {priceFormat({
                                              amount: priceInfo.oldPrice,
                                              currency: priceInfo.currency,
                                            })}
                                          </span>
                                        )}
                                    </span>
                                  </small>
                                  <br />
                                  <strong>
                                    {priceFormat({
                                      amount: priceInfo.price,
                                      currency: priceInfo.currency,
                                    })}
                                  </strong>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-white py-5">
        <div className="container-xxl">
          <h2 className="h3">Top-Pick Destinations</h2>
          <p className="mb-4">
            List the best places to travel in the world by continent.
          </p>
          <ul
            className="nav nav-tabs nav-fill"
            id="destinationsTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-dark active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#continent-europe"
                type="button"
                role="tab"
                aria-controls="continent-europe"
                aria-selected="true"
              >
                Europe
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-dark"
                id="continent-asia-tab"
                data-bs-toggle="tab"
                data-bs-target="#continent-asia"
                type="button"
                role="tab"
                aria-controls="continent-asia"
                aria-selected="false"
              >
                Asia
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-dark"
                id="continent-north-america-tab"
                data-bs-toggle="tab"
                data-bs-target="#continent-north-america"
                type="button"
                role="tab"
                aria-controls="continent-north-america"
                aria-selected="false"
              >
                North America
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-dark"
                id="continent-south-america-tab"
                data-bs-toggle="tab"
                data-bs-target="#continent-south-america"
                type="button"
                role="tab"
                aria-controls="continent-south-america"
                aria-selected="false"
              >
                South America
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-dark"
                id="continent-africa-tab"
                data-bs-toggle="tab"
                data-bs-target="#continent-africa"
                type="button"
                role="tab"
                aria-controls="continent-africa"
                aria-selected="false"
              >
                Africa
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div
              className="tab-pane active pt-3 px-1"
              id="continent-europe"
              role="tabpanel"
              aria-labelledby="continent-europe-tab"
              tabIndex={0}
            >
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/turkey-tours"} title="Turkey Tours">
                      <Image
                        src="/images/home/destinations/turkey.jpg"
                        alt="Turkey Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/turkey-tours"}
                          title="Turkey Tours"
                          className="text-decoration-none text-dark"
                        >
                          Turkey
                        </a>
                      </h3>
                      <p className="text-center">1980+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/greece-tours"} title="Greece Tours">
                      <Image
                        src="/images/home/destinations/greece.jpg"
                        alt="Greece Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/greece-tours"}
                          title="Greece Tours"
                          className="text-decoration-none text-dark"
                        >
                          Greece
                        </a>
                      </h3>
                      <p className="text-center">47+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/albania-tours"} title="Albania Tours">
                      <Image
                        src="/images/home/destinations/albania.jpg"
                        alt="Albania Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/albania-tours"}
                          title="Albania Tours"
                          className="text-decoration-none text-dark"
                        >
                          Albania
                        </a>
                      </h3>
                      <p className="text-center">38+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/bulgaria-tours"} title="Bulgaria Tours">
                      <Image
                        src="/images/home/destinations/bulgaria.jpg"
                        alt="Bulgaria Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/bulgaria-tours"}
                          title="Bulgaria Tours"
                          className="text-decoration-none text-dark"
                        >
                          Bulgaria
                        </a>
                      </h3>
                      <p className="text-center">37+ Tours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane pt-3 px-1"
              id="continent-asia"
              role="tabpanel"
              aria-labelledby="continent-asia-tab"
              tabIndex={0}
            >
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/nepal-tours"} title="Nepal Tours">
                      <Image
                        src="/images/home/destinations/nepal.jpg"
                        alt="Nepal Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/nepal-tours"}
                          title="Nepal Tours"
                          className="text-decoration-none text-dark"
                        >
                          Nepal
                        </a>
                      </h3>
                      <p className="text-center">91+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/sri-lanka-tours"} title="Sri Lanka Tours">
                      <Image
                        src="/images/home/destinations/sri-lanka.jpg"
                        alt="Sri Lanka Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/sri-lanka-tours"}
                          title="Sri Lanka Tours"
                          className="text-decoration-none text-dark"
                        >
                          Sri Lanka
                        </a>
                      </h3>
                      <p className="text-center">60+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/maldives-tours"} title="Maldives Tours">
                      <Image
                        src="/images/home/destinations/maldives.jpg"
                        alt="Maldives Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/maldives-tours"}
                          title="Maldives Tours"
                          className="text-decoration-none text-dark"
                        >
                          Maldives
                        </a>
                      </h3>
                      <p className="text-center">47+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/vietnam-tours"} title="Vietnam Tours">
                      <Image
                        src="/images/home/destinations/vietnam.jpg"
                        alt="Vietnam Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/vietnam-tours"}
                          title="Vietnam Tours"
                          className="text-decoration-none text-dark"
                        >
                          Vietnam
                        </a>
                      </h3>
                      <p className="text-center">31+ Tours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane pt-3 px-1"
              id="continent-north-america"
              role="tabpanel"
              aria-labelledby="continent-north-america-tab"
              tabIndex={0}
            >
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a
                      href={"/united-states-tours"}
                      title="United States Tours"
                    >
                      <Image
                        src="/images/home/destinations/united-states.jpg"
                        alt="United States Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/united-states-tours"}
                          title="United States Tours"
                          className="text-decoration-none text-dark"
                        >
                          United States
                        </a>
                      </h3>
                      <p className="text-center">3+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/belize-tours"} title="Belize Tours">
                      <Image
                        src="/images/home/destinations/belize.jpg"
                        alt="Belize Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/belize-tours"}
                          title="Belize Tours"
                          className="text-decoration-none text-dark"
                        >
                          Belize
                        </a>
                      </h3>
                      <p className="text-center">1+ Tours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane pt-3 px-1"
              id="continent-south-america"
              role="tabpanel"
              aria-labelledby="continent-south-america-tab"
              tabIndex={0}
            >
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/peru-tours"} title="Peru Tours">
                      <Image
                        src="/images/home/destinations/peru.jpg"
                        alt="Peru Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/peru-tours"}
                          title="Peru Tours"
                          className="text-decoration-none text-dark"
                        >
                          Peru
                        </a>
                      </h3>
                      <p className="text-center">46+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/ecuador-tours"} title="Ecuador Tours">
                      <Image
                        src="/images/home/destinations/ecuador.jpg"
                        alt="Ecuador Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/ecuador-tours"}
                          title="Ecuador Tours"
                          className="text-decoration-none text-dark"
                        >
                          Ecuador
                        </a>
                      </h3>
                      <p className="text-center">40+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/colombia-tours"} title="Colombia Tours">
                      <Image
                        src="/images/home/destinations/colombia.jpg"
                        alt="Colombia Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/colombia-tours"}
                          title="Colombia Tours"
                          className="text-decoration-none text-dark"
                        >
                          Colombia
                        </a>
                      </h3>
                      <p className="text-center">9+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/bolivia-tours"} title="Bolivia Tours">
                      <Image
                        src="/images/home/destinations/bolivia.jpg"
                        alt="Bolivia Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/bolivia-tours"}
                          title="Bolivia Tours"
                          className="text-decoration-none text-dark"
                        >
                          Bolivia
                        </a>
                      </h3>
                      <p className="text-center">6+ Tours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane pt-3 px-1"
              id="continent-africa"
              role="tabpanel"
              aria-labelledby="continent-africa-tab"
              tabIndex={0}
            >
              <div className="row">
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/egypt-tours"} title="Egypt Tours">
                      <Image
                        src="/images/home/destinations/egypt.jpg"
                        alt="Egypt Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/egypt-tours"}
                          title="Egypt Tours"
                          className="text-decoration-none text-dark"
                        >
                          Egypt
                        </a>
                      </h3>
                      <p className="text-center">121+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/tanzania-tours"} title="Tanzania Tours">
                      <Image
                        src="/images/home/destinations/tanzania.jpg"
                        alt="Tanzania Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/tanzania-tours"}
                          title="Tanzania Tours"
                          className="text-decoration-none text-dark"
                        >
                          Tanzania
                        </a>
                      </h3>
                      <p className="text-center">94+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/uganda-tours"} title="Uganda Tours">
                      <Image
                        src="/images/home/destinations/uganda.jpg"
                        alt="Uganda Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/uganda-tours"}
                          title="Uganda Tours"
                          className="text-decoration-none text-dark"
                        >
                          Uganda
                        </a>
                      </h3>
                      <p className="text-center">34+ Tours</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card border-0">
                    <a href={"/kenya-tours"} title="Kenya Tours">
                      <Image
                        src="/images/home/destinations/kenya.jpg"
                        alt="Kenya Tours"
                        width={400}
                        height={300}
                        className="img-fluid rounded-top mx-auto card-img-top"
                        style={{ height: "auto" }}
                        quality={100}
                        loading="lazy"
                      />
                    </a>
                    <div className="card-body">
                      <h3 className="card-title text-center h6">
                        <a
                          href={"/kenya-tours"}
                          title="Kenya Tours"
                          className="text-decoration-none text-dark"
                        >
                          Kenya
                        </a>
                      </h3>
                      <p className="text-center">30+ Tours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-6">
              <h2 className="h3 text-white">Subscribe to Our Newsletter</h2>
              <p className="text-white">
                Enjoy savings of up to 50% on our tours! Gain exclusive access
                to email-only offers for members.
              </p>
            </div>
            <div className="col-12 col-md-6">
              {subscribeStatus == "error" && (
                <div className="alert alert-danger" role="alert">
                  {subscribeErrorMessage}
                </div>
              )}
              {subscribeStatus == "success" && (
                <div className="alert alert-success" role="alert">
                  Your registration has been received. We thank you.
                </div>
              )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="home-subscribe-mail-input"
                  placeholder="Your mail"
                  aria-label="Your mail"
                  aria-describedby="btn-subscribe"
                  value={subscribeMail}
                  onChange={(e) => {
                    setSubscribeMail(e.target.value);
                  }}
                />
                {subscribeLoading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status"> Loading...</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary px-4"
                    type="button"
                    id="btn-subscribe"
                    onClick={() => {
                      subscribePost();
                    }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
              <p className="text-white">
                <small>
                  By submitting this form, I agree to the TravelShop Booking{" "}
                  <a href="/terms-of-use" className="text-white">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-white">
                    Privacy Policy
                  </a>
                  .
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5">
        <div className="container-xxl">
          <h2 className="h3">Discover the Best Travel Packages by Category</h2>
          <p className="mb-4">
            Explore tours, places to visit, and top tourist attractions by
            category.
          </p>

          <div className="row">
            <div className="col-6 col-md-4">
              <div className="list-group list-group-flush">
                <a
                  href="/worldwide-indian-package-tours"
                  title="Wordlwide Indian Package Tours"
                  className="list-group-item list-group-item-action"
                >
                  Indian Package Tours
                </a>
                <a
                  href="/worldwide-culture-and-historical-tours"
                  title="Worldwide Culture &amp; Historical Tours"
                  className="list-group-item list-group-item-action"
                >
                  Culture &amp; Historical Tours
                </a>
                <a
                  href="/worldwide-religious-tours"
                  title="Worldwide Religious Tours"
                  className="list-group-item list-group-item-action"
                >
                  Religious Tours
                </a>
                <a
                  href="/worldwide-new-year-and-christmas-tours"
                  title="Worlwide New Year &amp; Christmas Tours"
                  className="list-group-item list-group-item-action"
                >
                  New Year &amp; Christmas Tours
                </a>
                <a
                  href="/worldwide-anzac-day-tours"
                  title="Anzac Day Tours"
                  className="list-group-item list-group-item-action"
                >
                  Anzac Day Tours
                </a>
                <a
                  href="/worldwide-all-inclusive-tours"
                  title="Worldwide All Inclusive Tours"
                  className="list-group-item list-group-item-action"
                >
                  All Inclusive Tours
                </a>
                <a
                  href="/worldwide-adrenaline-and-extreme-sport-tours"
                  title="Worldwide Adrenaline &amp; Extreme Sport Tours"
                  className="list-group-item list-group-item-action"
                >
                  Adrenaline &amp; Extreme Sport Tours
                </a>
                <a
                  href="/worldwide-gulet-cruise-tours"
                  title="Worldwide Gulet Cruise Tours"
                  className="list-group-item list-group-item-action"
                >
                  Gulet Cruise Tours
                </a>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="list-group list-group-flush">
                <a
                  href="/worldwide-blue-cruise-ship-tours"
                  title="Worldwide Blue Cruise Ship Tours"
                  className="list-group-item list-group-item-action"
                >
                  Blue Cruise Ship Tours
                </a>
                <a
                  href="/worldwide-city-sightseeing-tours"
                  title="Worldwide City Sightseeing Tours"
                  className="list-group-item list-group-item-action"
                >
                  City Sightseeing Tours
                </a>
                <a
                  href="/worldwide-eco-tours"
                  title="Worldwide Eco Tours"
                  className="list-group-item list-group-item-action"
                >
                  Eco Tours
                </a>
                <a
                  href="/worldwide-combined-country-tours"
                  title="Worldwide Combined Country Tours"
                  className="list-group-item list-group-item-action"
                >
                  Combined Country Tours
                </a>
                <a
                  href="/worldwide-adventure-tours"
                  title="Worlwide Adventure Tours"
                  className="list-group-item list-group-item-action"
                >
                  Adventure Tours
                </a>
                <a
                  href="/worldwide-national-park-tours"
                  title="Worldwide National Park Tours"
                  className="list-group-item list-group-item-action"
                >
                  National Park Tours
                </a>
                <a
                  href="/worldwide-family-holidays-tours"
                  title="Worldwide Family Holidays Tours"
                  className="list-group-item list-group-item-action"
                >
                  Family Holidays Tours
                </a>
                <a
                  href="/worldwide-healthy-thermal-and-beauty-tours"
                  title="Worldwide Healthy Thermal & Beauty Tours"
                  className="list-group-item list-group-item-action"
                >
                  Healthy Thermal & Beauty Tours
                </a>
              </div>
            </div>
            <div className="col-6 col-md-4 d-none d-md-block">
              <div className="list-group list-group-flush">
                <a
                  href="/worldwide-amusement-park-tickets-tours"
                  title="Worldwide Amusement Park Tickets"
                  className="list-group-item list-group-item-action"
                >
                  Amusement Park Tickets Tours
                </a>
                <a
                  href="/worldwide-special-days-tours"
                  title="Worldwide Special Days Tours"
                  className="list-group-item list-group-item-action"
                >
                  Special Days Tours
                </a>
                <a
                  href="/worldwide-luxury-travel-tours"
                  title="Worldwide Luxury Travel Tours"
                  className="list-group-item list-group-item-action"
                >
                  Luxury Travel Tours
                </a>
                <a
                  href="/worldwide-culinary-wine-food-and-tasting-tours"
                  title="Worldwide Culinary, Wine, Food &amp; Tasting Tours"
                  className="list-group-item list-group-item-action"
                >
                  Culinary, Wine, Food &amp; Tasting Tours
                </a>
                <a
                  href="/worldwide-honeymoon-tours"
                  title="Worldwide Honeymoon Tours"
                  className="list-group-item list-group-item-action"
                >
                  Honeymoon Tours
                </a>
                <a
                  href="/worldwide-ski-tours"
                  title="Worldwide Ski Tours"
                  className="list-group-item list-group-item-action"
                >
                  Ski Tours
                </a>
                <a
                  href="/worldwide-event-tours"
                  title="Worldwide Event Tours"
                  className="list-group-item list-group-item-action"
                >
                  Event Tours
                </a>
                <a
                  href="/worldwide-educational-tours"
                  title="Worldwide Educational Tours"
                  className="list-group-item list-group-item-action"
                >
                  Educational Tours
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="container-xxl">
          <h2 className="h3">The best and most favorable way to travel</h2>
          <div className="row mt-3">
            <div className="col-6 col-md-3 mt-3">
              <span className="h4">93%</span>
              <br />
              Repeat guest
            </div>
            <div className="col-6 col-md-3 mt-3">
              <span className="h4">97%</span>
              <br />
              Guest satisfaction
            </div>
            <div className="col-6 col-md-3 mt-3">
              <span className="h4">80+</span>
              <br />
              Awards
            </div>
            <div className="col-6 col-md-3 mt-3">
              <span className="h4">18+</span>
              <br />
              Years experience
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
