import Image from "next/image";
import HorizontalCardPricing from "./horizontal-card-pricing";
import styles from "./horizontal-card.module.scss";

export default function HorizontalCard({
  id,
  name,
  slug,
  image,
  description,
  destinationCount,
  duration,
  priceLoading,
  priceInfo,
}: {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  destinationCount: number;
  duration: number;
  priceLoading: boolean;
  priceInfo: {
    price: number;
    oldPrice: number;
    currency: string;
  };
}) {
  var tourLink = "/tour/" + slug;

  return (
    <div className="card border-light-subtle mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-4">
            <a
              href={tourLink}
              target="_blank"
              className="text-dark text-decoration-none"
            >
              <Image
                src={image}
                alt={name}
                width={350}
                height={200}
                className="img-fluid rounded mx-auto"
                loading="lazy"
                style={{ height: "auto", width: "auto" }}
                quality={100}
              />
            </a>
          </div>
          <div className="col-12 col-md-8">
            <a
              href={tourLink}
              title={name}
              target="_blank"
              className="text-dark text-decoration-none"
            >
              <h2 className={styles.title + " h5"}>{name}</h2>
            </a>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-xl-8">
                <p className={styles.description}>
                  <small>
                    {description && description.replace(/<(.|\n)*?>/g, "")}
                  </small>
                </p>
                <div className="row">
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
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
                    {duration == 1 ? "Daily" : duration + " Days"}
                  </div>
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>{" "}
                    {`${destinationCount} ${
                      destinationCount == 1 ? "Destination" : "Destinations"
                    }`}
                  </div>
                  {/* <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <a href="#" className="text-dark text-decoration-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-map"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                        />
                      </svg>{" "}
                      View Map
                    </a>
                  </div>{" "}
                  <div className="col-6 col-md-12 col-lg-12 col-xl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>{" "}
                    0 (0 review)
                  </div> */}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="row">
                  <div className="col-12 text-center py-1">
                    {priceLoading && (
                      <div className="placeholder-glow">
                        <span className="placeholder placeholder-sm col-6"></span>
                        <span className="placeholder placeholder-lg col-8"></span>
                        <span className="placeholder placeholder-sm col-12"></span>
                      </div>
                    )}
                    {!priceLoading && priceInfo && (
                      <HorizontalCardPricing
                        price={priceInfo.price}
                        oldPrice={priceInfo.oldPrice}
                        currency={priceInfo.currency}
                      />
                    )}
                  </div>
                  <div className="col-12">
                    <a
                      className="btn btn-primary w-100 mt-2"
                      href={tourLink}
                      target="_blank"
                      role="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 17 17"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                      &nbsp;View Tour
                    </a>
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
