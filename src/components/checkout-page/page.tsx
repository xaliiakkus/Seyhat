"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getCookie } from "cookies-next";
import Breadcrumb from "@/components/header/breadcrumb";
import getTourDetail from "@/services/tourDetailService";
import getTourAvailability from "@/services/tourAvailability";
import getLocations from "@/services/locations";
import postBooking from "@/services/tourBooking";
import MobileFooterSticky from "./mobile-footer-sticky";
import priceFormat from "@/helpers/priceFormat";
import {
  MaskedInput,
  DEFAULT_MASK_RULES,
  createDefaultMaskGenerator,
  mask,
} from "react-hook-mask";

export default function Page() {
  const searchParams = useSearchParams();
  const [tourDetailLoading, setTourDetailLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [travellers, setTravellers] = useState(
    searchParams.has("pax") ? Number(searchParams.get("pax")) : 1
  );

  const [locations, setLocations] = useState([
    { id: 0, name: "", phone_code: "" },
  ]);

  const [tourDetail, setTourDetail] = useState({
    id: 0,
    name: "",
    slug: "",
    startLocation: "",
    endLocation: "",
    durationDays: 0,
    routes: [{ id: 0 }],
    languages: [{ id: 0, name: "" }],
    defaults: { accommodation: false },
  });

  const serviceType = searchParams.has("service-type")
    ? searchParams.get("service-type")!
    : "regular";

  const [model, setModel] = useState({
    service_type: serviceType,
    type: "tour",
    pax: travellers,
    max_pax: 0,
    price_id: null,
    seller_id: null,
    company_id: null,
    main_company_id: null,
    tour_id: 0,
    location_id: 0,
    departure_location_id: 0,
    date: searchParams.get("date")!,
    tour: {
      name: "",
    },
    rooms: [{ id: "", name: "", desc: " ", price: 0, pax: 0, max_pax: 0 }],
    customers: [],
    charges: [],
    initial_units: 0,
    initial_adults: travellers,
    initial_childs: 0,
    initial_infants: 0,
    initial_sng: 0,
    initial_dbl: 0,
    guide_amount: 0,
    initial_trp: 0,
    unit_price: 0,
    adult_price: 0,
    child_price: 0,
    infant_price: 0,
    sng_price: 0,
    dbl_price: 0,
    trp_price: 0,
    discount: 0,
    currency_id: getCookie("currency"),
    payment_model_id: "total",
    return_url:
      "https://tour-categories.travelshopbooking.com/api/payment-complete.php",
    card_name: "",
    card_number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });
  const [iframeUrl, setIframeUrl] = useState("");

  var roomPax =
    model.initial_sng + model.initial_dbl * 2 + model.initial_trp * 3;

  var customersMatch =
    tourDetail.defaults.accommodation && roomPax === model.customers.length;

  var paxRoomMatch = tourDetail.defaults.accommodation ? customersMatch : true;

  var total =
    model.unit_price * model.initial_units +
    model.adult_price * model.initial_adults +
    model.child_price * model.initial_childs +
    model.infant_price * model.initial_infants +
    model.sng_price * model.initial_sng +
    model.dbl_price * model.initial_dbl * 2 +
    model.trp_price * model.initial_trp * 3 +
    model.guide_amount;

  var saveable = () => {
    const firstcustomer = model.customers[0];
    const allcustomers = model.customers.filter(
      (item: any) =>
        item.first_name !== null &&
        item.last_name !== null &&
        item.title !== null &&
        item.dob !== null &&
        item.location_id !== null
    );
    return (
      customersMatch &&
      model.tour_id !== 0 &&
      model.location_id !== 0 &&
      model.departure_location_id !== 0 &&
      model.card_name !== "" &&
      model.card_number !== "" &&
      model.exp_month !== "" &&
      model.exp_year !== "" &&
      model.cvc !== "" &&
      firstcustomer["phone"] !== null &&
      firstcustomer["phone_code"] !== null &&
      firstcustomer["email"] !== null &&
      allcustomers.length === model.customers.length
    );
  };

  const submitForm = async () => {
    setSubmitLoading(true);
    setIframeUrl("");
    await postBooking({
      slug: tourDetail.slug,
      requestParameters: {
        ...model,
        customers: model.customers.map((customer: any) => {
          return {
            ...customer,
            dob: mask(customer.dob || "", {
              rules: DEFAULT_MASK_RULES,
              generateMask: () => "99/99/9999",
            }),
          };
        }),
      },
    })
      .then((res) => {
        setIframeUrl(res.payment_url);
        setSubmitLoading(false);
      })
      .catch((error) => {
        setSubmitLoading(false);
      });
  };

  const fetchTourDetail = async () => {
    await getTourDetail(searchParams.get("slug")!).then((res) => {
      setTourDetail({
        ...tourDetail,
        id: res.id,
        name: res.name,
        slug: res.slug,
        startLocation: res.startLocation,
        endLocation: res.endLocation,
        durationDays: res.duration_days,
        routes: res.routes,
        languages: res.languages,
        defaults: { accommodation: res.defaults.accommodation },
      });
      setTourDetailLoading(false);
    });
  };

  const fetchLocations = async () => {
    await getLocations().then((res) => {
      setLocations(res);
    });
  };

  const fetchAvailabilityDates = async (tourSlug: string) => {
    setAvailabilityLoading(true);
    await getTourAvailability({
      tourSlug: tourSlug,
      date: searchParams.get("date")!,
      pax: travellers,
      activeCurrency: getCookie("currency"),
      serviceType,
    }).then((availabilityRes: any) => {
      const sngCount = availabilityRes.rooms.find((r: any) => r.id === "sng")
        ? availabilityRes.rooms.find((r: any) => r.id === "sng").count
        : 0;

      const dblCount = availabilityRes.rooms.find((r: any) => r.id === "dbl")
        ? availabilityRes.rooms.find((r: any) => r.id === "dbl").count
        : 0;

      const trpCount = availabilityRes.rooms.find((r: any) => r.id === "trp")
        ? availabilityRes.rooms.find((r: any) => r.id === "trp").count
        : 0;

      const locationId =
        tourDetail.routes.length > 0
          ? tourDetail.routes[tourDetail.routes.length - 1].id
          : 0;

      setModel({
        ...model,
        price_id: availabilityRes.price_id,
        tour_id: availabilityRes.id,
        customers: availabilityRes.customers,
        rooms: availabilityRes.rooms,
        max_pax: availabilityRes.maxPax,
        location_id: locationId,
        departure_location_id: locationId,
        initial_sng: sngCount,
        initial_dbl: dblCount,
        initial_trp: trpCount,
        initial_adults:
          sngCount || dblCount * 2 || trpCount * 3
            ? sngCount || dblCount * 2 || trpCount * 3
            : 1,
        unit_price: availabilityRes.prices[0][serviceType].unit
          ? availabilityRes.prices[0][serviceType].unit
          : 0,
        adult_price: availabilityRes.prices[0][serviceType].adl
          ? availabilityRes.prices[0][serviceType].adl
          : 0,
        child_price: availabilityRes.prices[0][serviceType].chd
          ? availabilityRes.prices[0][serviceType].chd
          : 0,
        infant_price: availabilityRes.prices[0][serviceType].inf
          ? availabilityRes.prices[0][serviceType].inf
          : 0,
        sng_price: availabilityRes.prices[0][serviceType].sng
          ? availabilityRes.prices[0][serviceType].sng
          : 0,
        dbl_price: availabilityRes.prices[0][serviceType].dbl
          ? availabilityRes.prices[0][serviceType].dbl
          : 0,
        trp_price: availabilityRes.prices[0][serviceType].trp
          ? availabilityRes.prices[0][serviceType].trp
          : 0,
      });
      setAvailabilityLoading(false);
    });
  };

  const onRoomPaxChanged = ({ room, pax }: { room: any; pax: any }) => {
    const existsAtIndex = model.rooms.findIndex((r) => r.id === room.id);
    var newRooms: any = JSON.parse(JSON.stringify(model.rooms));

    if (existsAtIndex !== -1)
      newRooms[existsAtIndex] = {
        ...room,
        count: pax % room.max_pax === 0 ? Math.ceil(pax / room.max_pax) : 0,
        pax,
      };
    else
      newRooms.push({
        ...room,
        count: pax % room.max_pax === 0 ? Math.ceil(pax / room.max_pax) : 0,
        pax,
      });

    if (room.id == "sng") {
      setModel({
        ...model,
        rooms: newRooms,
        initial_sng:
          pax % room.max_pax === 0 ? Math.ceil(pax / room.max_pax) : 0,
      });
    }

    if (room.id == "dbl") {
      setModel({
        ...model,
        rooms: newRooms,
        initial_dbl:
          pax % room.max_pax === 0 ? Math.ceil(pax / room.max_pax) : 0,
      });
    }

    if (room.id == "trp") {
      setModel({
        ...model,
        rooms: newRooms,
        initial_trp:
          pax % room.max_pax === 0 ? Math.ceil(pax / room.max_pax) : 0,
      });
    }
  };

  const changeCustomerValue = ({
    customer,
    name,
    value,
  }: {
    customer: any;
    name: string;
    value: string;
  }) => {
    var newCustomers: any = JSON.parse(JSON.stringify(model.customers));
    newCustomers[customer][name] = value;
    setModel({ ...model, customers: newCustomers });
  };

  useEffect(() => {
    fetchTourDetail();
    fetchLocations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      fetchAvailabilityDates(searchParams.get("slug")!);
    }
  }, [travellers]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchAvailabilityDates(searchParams.get("slug")!);
    }
  }, [tourDetail]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const addDays = (date: any, days: any) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  if (tourDetailLoading)
    return (
      <main>
        <div className="container-xxl my-4">
          <Breadcrumb
            items={[{ pageTitle: "Checkout", pageUrl: "/checkout" }]}
          />
          <h1 className="h3">Checkout</h1>
          <div className="text-center my-4">
            <div
              className="spinner-border text-primary py-4"
              role="status"
              style={{ width: 75, height: 75 }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="h5 mt-4">
              Loading your order details.
              <br />
              Please wait.
            </p>
          </div>
        </div>
      </main>
    );

  return (
    <main>
      <div className="container-xxl mt-4">
        <Breadcrumb items={[{ pageTitle: "Checkout", pageUrl: "/checkout" }]} />
        <h1 className="h3">Checkout</h1>

        <div className="row mt-4">
          <div className="col-12 col-lg-8">
            <div className="card border-light-subtle mb-3">
              <div className="card-body p-4">
                <h4 className="card-title">How many travelers?</h4>
                <div className="row align-items-center mt-4">
                  <div className="col-6 col-md-9">
                    <strong>Travellers</strong>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="input-group justify-content-between align-items-center">
                      <button
                        className="btn btn-primary rounded w-25"
                        type="button"
                        disabled={travellers === 1 || availabilityLoading}
                        onClick={() => {
                          setTravellers(travellers - 1);
                        }}
                      >
                        -
                      </button>
                      <span>
                        <strong>{travellers}</strong>
                      </span>
                      <button
                        className="btn btn-primary rounded w-25"
                        type="button"
                        disabled={
                          travellers === model.max_pax || availabilityLoading
                        }
                        onClick={() => {
                          setTravellers(travellers + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {model.rooms.length > 0 && (
              <div className="card border-light-subtle my-3">
                <div className="card-body">
                  <h4 className="card-title">Select accommodation</h4>
                  {!availabilityLoading && !customersMatch && (
                    <div className="col-12 alert alert-danger" role="alert">
                      <strong>Room total</strong> and{" "}
                      <strong>Number of Travellers</strong> have to equal
                    </div>
                  )}

                  {availabilityLoading && (
                    <div className="text-center my-4">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p>Loading. Please wait.</p>
                    </div>
                  )}
                  {!availabilityLoading &&
                    model.rooms.map((room) => (
                      <div
                        className="row align-items-center mt-4"
                        key={room.id}
                      >
                        <div className="col-12 col-md-6">
                          <strong>{room.name}</strong>
                          <p>{room.desc}</p>
                        </div>
                        <div className="col-4 col-md-2">
                          {priceFormat({
                            amount: room.price,
                            currency: getCookie("currency"),
                          })}
                        </div>
                        <div className="col-8 col-md-4">
                          <select
                            className="form-select"
                            defaultValue={room.pax}
                            onChange={(e) => {
                              onRoomPaxChanged({
                                room,
                                pax: parseInt(e.target.value),
                              });
                            }}
                          >
                            {(() => {
                              const rows = [];
                              for (let i = 0; i <= travellers; i++) {
                                rows.push(
                                  <option value={i} key={i}>
                                    {i} {i > 1 ? "Travellers" : "Traveler"}
                                  </option>
                                );
                              }
                              return rows;
                            })()}
                          </select>
                        </div>
                        {room.pax % room.max_pax !== 0 && room.pax !== 0 && (
                          <div
                            className="col-12 alert alert-warning mt-3"
                            role="alert"
                          >
                            This accommodation needs {room.max_pax} travellers.
                            Please add {room.max_pax} traveller
                            {room.max_pax > 1 ? "s" : ""} or choose another
                            accommodation type.
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {model.customers.length > 0 && (
              <div className="card border-light-subtle my-3">
                <div className="card-body p-0">
                  <h4 className="card-title p-3 pb-1">Add traveller details</h4>
                  <div
                    className="accordion accordion-flush"
                    id="itineraryAccordion"
                  >
                    {model.customers.map((customer: any, row: number) => {
                      return (
                        <div className="accordion-item" key={row}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#itinerary-" + row}
                              aria-expanded="true"
                              aria-controls={"itinerary-" + row}
                            >
                              <span>
                                <strong>
                                  {row === 0
                                    ? "Lead Traveler / Contact Person: "
                                    : "Traveler " + Number(row + 1) + ": "}
                                </strong>
                                {customer.first_name} {customer.last_name}
                              </span>
                            </button>
                          </h2>
                          <div
                            id={"itinerary-" + row}
                            className="accordion-collapse collapse show"
                            data-bs-parent="#itineraryAccordion"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-12 col-md-4 mb-3">
                                  <p>
                                    Title <span className="text-danger">*</span>
                                  </p>
                                  {["Mr.", "Mrs.", "Ms."].map(
                                    (title: any, titleRow: number) => (
                                      <div
                                        className="form-check form-check-inline"
                                        key={titleRow}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id={"customer-title-" + titleRow}
                                          value={title}
                                          checked={title === customer.title}
                                          onChange={(e) => {
                                            changeCustomerValue({
                                              customer: row,
                                              name: "title",
                                              value: e.target.value,
                                            });
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={"customer-title-" + titleRow}
                                        >
                                          {title}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className="col-6 col-md-4 mb-3">
                                  <label
                                    htmlFor={"customerFirstName" + row}
                                    className="form-label"
                                  >
                                    Fist Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"customerFirstName" + row}
                                    defaultValue={customer.fist_name}
                                    autoComplete="off"
                                    onChange={(e) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "first_name",
                                        value: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-6 col-md-4 mb-3">
                                  <label
                                    htmlFor={"customerLastName" + row}
                                    className="form-label"
                                  >
                                    Last Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"customerLastName" + row}
                                    defaultValue={customer.last_name}
                                    autoComplete="off"
                                    onChange={(e) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "last_name",
                                        value: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                  <label
                                    htmlFor={"customerDateOfBirth" + row}
                                    className="form-label"
                                  >
                                    Date of Birth{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <MaskedInput
                                    className="form-control"
                                    id={"customerDateOfBirth" + row}
                                    maskGenerator={createDefaultMaskGenerator(
                                      "99/99/9999"
                                    )}
                                    autoComplete="off"
                                    placeholder="DD/MM/YYYY"
                                    value={customer.dob || ""}
                                    onChange={(val) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "dob",
                                        value: val,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                  <label
                                    htmlFor={"customerNationality" + row}
                                    className="form-label"
                                  >
                                    Nationality{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    className="form-select"
                                    id={"customerNationality" + row}
                                    defaultValue={customer.location_id}
                                    onChange={(e) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "location_id",
                                        value: e.target.value,
                                      });
                                    }}
                                  >
                                    <option></option>
                                    {locations.map((item: any) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 mb-3">
                                  <label
                                    htmlFor={"customerPhone" + row}
                                    className="form-label"
                                  >
                                    Phone <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. +1 234 5678"
                                    className="form-control"
                                    id={"customerPhone" + row}
                                    defaultValue={customer.phone}
                                    autoComplete="off"
                                    onChange={(e) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "phone",
                                        value: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-6 mb-3">
                                  <label
                                    htmlFor={"customerEmail" + row}
                                    className="form-label"
                                  >
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"customerEmail" + row}
                                    defaultValue={customer.email}
                                    autoComplete="off"
                                    onChange={(e) => {
                                      changeCustomerValue({
                                        customer: row,
                                        name: "email",
                                        value: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="card border-light-subtle my-3">
              <div className="card-body">
                <h4 className="card-title">Add payment details</h4>
                <p>Complete your order by providing your payment details.</p>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label
                      htmlFor={"paymentDetailFullName"}
                      className="form-label"
                    >
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={"paymentDetailFullName"}
                      defaultValue={model.card_name}
                      autoComplete="off"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          card_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label
                      htmlFor={"paymentDetailCardNumber"}
                      className="form-label"
                    >
                      Card Number <span className="text-danger">*</span>
                    </label>
                    <MaskedInput
                      className="form-control"
                      maskGenerator={createDefaultMaskGenerator(
                        "9999-9999-9999-9999"
                      )}
                      placeholder="____-____-____-____"
                      value={model.card_number}
                      autoComplete="off"
                      onChange={(val) => {
                        setModel({
                          ...model,
                          card_number: val,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label
                      htmlFor={"paymentDetailCardMonth"}
                      className="form-label"
                    >
                      Month <span className="text-danger">*</span>
                    </label>
                    <MaskedInput
                      id={"paymentDetailCardMonth"}
                      className="form-control"
                      maskGenerator={createDefaultMaskGenerator("99")}
                      placeholder="MM"
                      autoComplete="off"
                      value={model.exp_month}
                      onChange={(val) => {
                        setModel({
                          ...model,
                          exp_month: val,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-3">
                    <label
                      htmlFor={"paymentDetailCardYear"}
                      className="form-label"
                    >
                      Year <span className="text-danger">*</span>
                    </label>
                    <MaskedInput
                      id={"paymentDetailCardYear"}
                      className="form-control"
                      maskGenerator={createDefaultMaskGenerator("99")}
                      placeholder="YY"
                      autoComplete="off"
                      value={model.exp_year}
                      onChange={(val) => {
                        setModel({
                          ...model,
                          exp_year: val,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4 mb-3">
                    <label
                      htmlFor={"paymentDetailCardCvc"}
                      className="form-label"
                    >
                      CVC <span className="text-danger">*</span>
                    </label>
                    <MaskedInput
                      id={"paymentDetailCardCvc"}
                      className="form-control"
                      maskGenerator={createDefaultMaskGenerator("999")}
                      placeholder="___"
                      autoComplete="off"
                      value={model.cvc}
                      onChange={(val) => {
                        setModel({
                          ...model,
                          cvc: val,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!availabilityLoading && paxRoomMatch && (
              <div className="card border-light-subtle my-3">
                <div className="card-body">
                  <h4 className="card-title">
                    Your order summary and confirmation
                  </h4>

                  <table className="table my-4">
                    <tbody>
                      {tourDetail.defaults.accommodation &&
                        model.rooms.map((room: any) => {
                          if (room.count == 0) return null;

                          return (
                            <tr key={room.id}>
                              <td>{room.name}</td>
                              <td className="text-end">
                                {room.old_price > room.price && (
                                  <small>
                                    <span className="text-decoration-line-through text-danger">
                                      {priceFormat({
                                        amount: room.old_price,
                                        currency: getCookie("currency"),
                                      })}
                                    </span>
                                    &nbsp;
                                  </small>
                                )}
                                <strong>
                                  {priceFormat({
                                    amount: room.price,
                                    currency: getCookie("currency"),
                                  })}
                                </strong>{" "}
                                x {room.pax}
                              </td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td className="text-end h4">
                          {priceFormat({
                            amount: total,
                            currency: getCookie("currency"),
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="row">
                    <div className="col-12 col-md-6"></div>
                    <div className="col-12 col-md-6">
                      {!submitLoading && (
                        <button
                          type="button"
                          className="btn btn-primary w-100 float-end"
                          data-bs-toggle="modal"
                          data-bs-target="#paymentModal"
                          onClick={submitForm}
                          disabled={!saveable()}
                        >
                          Place Order
                        </button>
                      )}
                      {submitLoading && (
                        <button
                          className="btn btn-primary w-100 float-end"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-grow spinner-grow-sm"
                            aria-hidden="true"
                          ></span>
                          <span role="status"> Loading...</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-md-4 d-none d-lg-block">
            <div
              className="card border-light-subtle sticky-top"
              style={{ top: "20%" }}
            >
              <div className="card-body">
                <h4 className="mb-3">{tourDetail.name}</h4>
                <p>
                  <strong>Starts in: </strong>
                  {tourDetail.startLocation}
                </p>
                <p>
                  <strong>Start date: </strong>
                  {getFullDate(searchParams.get("date")!)}
                </p>
                <p>
                  <strong>Ends in: </strong>
                  {tourDetail.endLocation}
                </p>
                <p>
                  <strong>Duration: </strong>
                  {tourDetail.durationDays} Days
                </p>
                <p>
                  <strong>Operated in: </strong>
                  {tourDetail.languages.map((i: any) => i.name).join(",")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <div
          className="modal fade"
          id="paymentModal"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="paymentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="paymentModalLabel">
                  Payment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                {submitLoading && (
                  <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Please wait...</p>
                  </div>
                )}
                {iframeUrl && (
                  <iframe
                    src={iframeUrl}
                    style={{ minHeight: 600 }}
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      <MobileFooterSticky
        tourDetail={tourDetail}
        paxRoomMatch={paxRoomMatch}
        availabilityLoading={availabilityLoading}
        total={priceFormat({ amount: total, currency: getCookie("currency") })}
      />
    </main>
  );
}
