import styles from "./horizontal-card.module.scss";

export default function HorizontalCardSkeleton() {
  return (
    <div className="card border-light-subtle mb-3 placeholder-glow">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-4">
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
          </div>
          <div className="col-12 col-md-8">
            <h5 className="placeholder placeholder-lg col-8"></h5>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-xl-8">
                <p className={styles.description}>
                  <span className="placeholder placeholder-sm col-12"></span>
                  <span className="placeholder placeholder-sm col-12"></span>
                </p>

                <div className="row">
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <span className="placeholder col-6"></span>
                  </div>
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <span className="placeholder col-6"></span>
                  </div>
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <span className="placeholder col-6"></span>
                  </div>
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <span className="placeholder col-6"></span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="row">
                  <div className="col-12 text-center py-1">
                    <span className="placeholder placeholder-sm col-6"></span>
                    <span className="placeholder placeholder-lg col-8"></span>
                    <span className="placeholder placeholder-sm col-12"></span>
                  </div>
                  <div className="col-12">
                    <span className="placeholder placeholder-lg col-12"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
