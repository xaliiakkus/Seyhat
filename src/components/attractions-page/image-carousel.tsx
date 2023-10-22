import Image from "next/image";

export default function ImageCarousel({ images }: { images: any }) {
  const carouselImages = images.filter(function (item: any) {
    return item.high;
  });
  return (
    <div id="tourImagesCarousel" className="carousel slide p-1">
      <div className="carousel-indicators">
        {carouselImages.map((item: any, i: any, row: any) => {
          return (
            <button
              type="button"
              data-bs-target="#tourImagesCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? true : false}
              aria-label={"Image " + i}
              key={i}
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {carouselImages.map((item: any, i: any, row: any) => {
          return (
            <div
              className={"carousel-item" + (i === 0 ? " active" : "")}
              key={i}
            >
              <Image
                src={item.high}
                alt={i}
                width={750}
                height={500}
                className="d-block w-100 rounded"
                loading="lazy"
                style={{ height: "auto", width: "auto" }}
                quality={100}
              />
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#tourImagesCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#tourImagesCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
