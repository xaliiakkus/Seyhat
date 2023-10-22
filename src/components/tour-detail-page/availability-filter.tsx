export default function AvailabilityFilter({
  isRegular,
  isPrivate,
  departureMonths,
  availabilityFilters,
  availabilityFilterChange,
  groupSizeMin,
  groupSizeMax,
}: {
  isRegular: boolean;
  isPrivate: boolean;
  departureMonths: any;
  availabilityFilters: any;
  availabilityFilterChange: any;
  groupSizeMin: number;
  groupSizeMax: number;
}) {
  const travelerList = () => {
    const listItems = [];
    for (let i = groupSizeMin; i <= groupSizeMax; i++) {
      listItems.push(<option key={i}>{i}</option>);
    }
    return listItems;
  };
  return (
    <div className="row m-0 p-0">
      <div className="col-12 col-md-4">
        <div className="mb-3">
          <label
            htmlFor="availabilityFilterDepartureMonth"
            className="form-label"
          >
            Departure Month
          </label>
          <select
            className="form-select"
            id="availabilityFilterDepartureMonth"
            aria-label="Select departure month"
            defaultValue={availabilityFilters.departureMonth}
            onChange={(e) => {
              availabilityFilterChange({
                ...availabilityFilters,
                departureMonth: e.target.value,
              });
            }}
          >
            {departureMonths.map((month: string, index: number) => {
              var displayMonth = new Date(month);
              return (
                <option value={month} key={"departure-date-" + month}>
                  {displayMonth.toLocaleString("en-US", { month: "long" })}{" "}
                  {displayMonth.getFullYear()}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <div className="mb-3">
          <label htmlFor="availabilityFilterServiceType" className="form-label">
            Service Type
          </label>
          <select
            className="form-select"
            id="availabilityFilterServiceType"
            aria-label="Select service type"
            defaultValue={availabilityFilters.serviceType}
            onChange={(e) => {
              availabilityFilterChange({
                ...availabilityFilters,
                serviceType: e.target.value,
              });
            }}
          >
            {isRegular && <option value="regular">Regular</option>}
            {isPrivate && <option value="private">Private</option>}
          </select>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <div className="mb-3">
          <label htmlFor="availabilityFilterTravelers" className="form-label">
            Traveler(s)
          </label>
          <select
            className="form-select"
            id="availabilityFilterTravelers"
            aria-label="Select travelers"
            defaultValue={availabilityFilters.travelers}
            onChange={(e) => {
              availabilityFilterChange({
                ...availabilityFilters,
                travelers: e.target.value,
              });
            }}
          >
            {travelerList()}
          </select>
        </div>
      </div>
    </div>
  );
}
