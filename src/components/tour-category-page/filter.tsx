import { useState } from "react";
import {
  dates,
  durations,
  prices,
  accommodationTypes,
  guidingTypes,
  operatedLanguages,
  ageRange,
  tourTypes,
} from "@/services/filterPageFilterData";

export default function Filter({
  filterData,
  onFilterChange,
}: {
  filterData: any;
  onFilterChange: any;
}) {
  const [durationFrom, setDurationFrom] = useState(1);
  const [durationTo, setDurationTo] = useState(999);
  const [durationToList, setDurationToList] = useState(durations);

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-departure-date"
            aria-expanded="true"
            aria-controls="filter-departure-date"
          >
            Departure Date
          </button>
        </h2>
        <div
          id="filter-departure-date"
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            <select
              className="form-select"
              id="departure-date-select"
              aria-label="Departure Date"
              onChange={(e) => {
                if (e.target.value == "any") {
                  delete filterData.start;
                  onFilterChange({ filterData });
                } else {
                  onFilterChange({ ...filterData, start: e.target.value });
                }
              }}
            >
              <option value="any">Any</option>
              {dates.map(function (date) {
                return (
                  <option
                    value={date.slug}
                    key={"departure-" + date.month + "-" + date.year}
                  >
                    {date.month + " " + date.year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-duration"
            aria-expanded="true"
            aria-controls="filter-duration"
          >
            Duration
          </button>
        </h2>
        <div id="filter-duration" className="accordion-collapse collapse show">
          <div className="accordion-body">
            <div className="input-group mb-3">
              <label
                className="input-group-text"
                htmlFor="filter-duration-from"
              >
                From
              </label>
              <select
                className="form-select"
                id="filter-duration-from"
                aria-label="Duration From"
                onChange={(e) => {
                  setDurationFrom(parseInt(e.target.value));
                  var durationToVal = durationTo;

                  if (e.target.value == "any") {
                    delete filterData.duration;
                    onFilterChange({ filterData });
                  } else {
                    setDurationToList(
                      durations.filter((x) => x >= parseInt(e.target.value))
                    );

                    if (parseInt(e.target.value) > durationTo) {
                      setDurationTo(parseInt(e.target.value));
                      durationToVal = parseInt(e.target.value);
                    }

                    onFilterChange({
                      ...filterData,
                      duration: [parseInt(e.target.value), durationToVal],
                    });
                  }
                }}
              >
                {durations.map(function (duration) {
                  return (
                    <option value={duration} key={"duration-" + duration}>
                      {duration} {duration == 1 ? " day" : " days"}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="filter-duration-to">
                To
              </label>
              <select
                className="form-select"
                id="filter-duration-to"
                aria-label="Duration To"
                defaultValue={"999"}
                onChange={(e) => {
                  setDurationTo(parseInt(e.target.value));

                  if (e.target.value == "any") {
                    delete filterData.duration;
                    onFilterChange({ filterData });
                  } else {
                    onFilterChange({
                      ...filterData,
                      duration: [durationFrom, parseInt(e.target.value)],
                    });
                  }
                }}
              >
                {durationToList.map(function (duration) {
                  return (
                    <option value={duration} key={"duration-" + duration}>
                      {duration} {duration == 1 ? " day" : " days"}
                    </option>
                  );
                })}
                <option value="999">28+ days</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-price"
            aria-expanded="true"
            aria-controls="filter-price"
          >
            Price
          </button>
        </h2>
        <div id="filter-price" className="accordion-collapse collapse show">
          <div className="accordion-body">
            <select
              className="form-select"
              id="price-select"
              aria-label="Price"
              onChange={(e) => {
                if (e.target.value == "any") {
                  delete filterData.duration;
                  onFilterChange({ filterData });
                } else {
                  const splitValue = e.target.value.split("-");
                  onFilterChange({
                    ...filterData,
                    price: [splitValue[0], splitValue[1]],
                  });
                }
              }}
            >
              <option value="any">Any</option>
              {prices.map(function (price) {
                return (
                  <option
                    value={price.from + "-" + price.to}
                    key={"price-" + price.from + "-" + price.to}
                  >
                    {new Intl.NumberFormat().format(price.from) +
                      " - " +
                      new Intl.NumberFormat().format(price.to)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-tour-type"
            aria-expanded="true"
            aria-controls="filter-tour-type"
          >
            Tour Type
          </button>
        </h2>
        <div id="filter-tour-type" className="accordion-collapse collapse show">
          <div className="accordion-body">
            {tourTypes.map(function (type) {
              return (
                <div className="form-check mb-1" key={"tour-type-" + type.slug}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={"tour-type-" + type.slug}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange({
                          ...filterData,
                          service_types: [
                            type.slug,
                            ...filterData.service_types,
                          ],
                        });
                      } else {
                        onFilterChange({
                          ...filterData,
                          service_types: filterData.service_types.filter(
                            function (item: string) {
                              return item !== type.slug;
                            }
                          ),
                        });
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"tour-type-" + type.slug}
                  >
                    {type.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-accommodation-types"
            aria-expanded="true"
            aria-controls="filter-accommodation-types"
          >
            Accommodation Types
          </button>
        </h2>
        <div
          id="filter-accommodation-types"
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            {accommodationTypes.map(function (type) {
              return (
                <div
                  className="form-check mb-1"
                  key={"accommodation-type-" + type.slug}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={"accommodation-type-" + type.slug}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange({
                          ...filterData,
                          accommodations: [
                            type.slug,
                            ...filterData.accommodations,
                          ],
                        });
                      } else {
                        onFilterChange({
                          ...filterData,
                          accommodations: filterData.accommodations.filter(
                            function (item: string) {
                              return item !== type.slug;
                            }
                          ),
                        });
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"accommodation-type-" + type.slug}
                  >
                    {type.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-guiding-types"
            aria-expanded="true"
            aria-controls="filter-guiding-types"
          >
            Guiding Types
          </button>
        </h2>
        <div
          id="filter-guiding-types"
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            {guidingTypes.map(function (type) {
              return (
                <div
                  className="form-check mb-1"
                  key={"guide-type-" + type.slug}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={"guide-type-" + type.slug}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange({
                          ...filterData,
                          guiding: [type.slug, ...filterData.guiding],
                        });
                      } else {
                        onFilterChange({
                          ...filterData,
                          guiding: filterData.guiding.filter(function (
                            item: string
                          ) {
                            return item !== type.slug;
                          }),
                        });
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"guide-type-" + type.slug}
                  >
                    {type.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-operated-languages"
            aria-expanded="true"
            aria-controls="filter-operated-languages"
          >
            Operated Languages
          </button>
        </h2>
        <div
          id="filter-operated-languages"
          className="accordion-collapse collapse show"
        >
          <div className="accordion-body">
            {operatedLanguages.map(function (language) {
              return (
                <div
                  className="form-check mb-1"
                  key={"operated-language-" + language.slug}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={"operated-language-" + language.slug}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onFilterChange({
                          ...filterData,
                          languages: [language.slug, ...filterData.languages],
                        });
                      } else {
                        onFilterChange({
                          ...filterData,
                          languages: filterData.languages.filter(function (
                            item: string
                          ) {
                            return item !== language.slug;
                          }),
                        });
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"operated-language-" + language.slug}
                  >
                    {language.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white shadow-none fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filter-age-range"
            aria-expanded="true"
            aria-controls="filter-age-range"
          >
            Age Range
          </button>
        </h2>
        <div id="filter-age-range" className="accordion-collapse collapse show">
          <div className="accordion-body">
            <select
              className="form-select"
              id="age-range-select"
              aria-label="Age Range"
              onChange={(e) => {
                if (e.target.value == "any") {
                  delete filterData.start;
                  onFilterChange({ filterData });
                } else {
                  onFilterChange({ ...filterData, suitable: e.target.value });
                }
              }}
            >
              <option value="any-time">Any</option>
              {ageRange.map(function (age) {
                return (
                  <option value={age.slug} key={"age-range-" + age.slug}>
                    {age.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
