export default function PriceSideSkeleton() {
  return (
    <div className="placeholder-glow text-center">
      <h6 className="card-title placeholder-glow">
        <span className="placeholder col-4"></span>
      </h6>
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-7"></span>
      </h5>
      <button
        type="button"
        className="btn btn-primary mt-4 disabled placeholder col-12"
        aria-disabled="true"
      >
        Check Availability
      </button>
    </div>
  );
}
