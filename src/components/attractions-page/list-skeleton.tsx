export default function AttractionsListSkeleton() {
  return (
    <div className="row placeholder-glow">
      {[...Array(6)].map((x, i) => (
        <div className="col-6 col-lg-4 mt-2" key={i}>
          <div className="card border-light-subtle">
            <svg
              className="bd-placeholder-img card-img-top"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#9FA9B4"></rect>
            </svg>
            <div className="card-body text-center">
              <span className="placeholder col-6 card-title"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
