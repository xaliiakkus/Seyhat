import priceFormat from "@/helpers/priceFormat";

export default function HorizontalCardPricing({
  price,
  oldPrice,
  currency,
}: {
  price: number;
  oldPrice: number;
  currency: string;
}) {
  return (
    <div className="row align-items-center">
      <div className="col-12 col-lg-12">
        <small>
          From{" "}
          {oldPrice > 0 && price != oldPrice && (
            <span className="text-decoration-line-through text-danger">
              {priceFormat({
                amount: oldPrice,
                currency: currency,
              })}
            </span>
          )}
        </small>
        <br />
        <span className="h5">{priceFormat({ amount: price, currency })}</span>
      </div>
    </div>
  );
}
