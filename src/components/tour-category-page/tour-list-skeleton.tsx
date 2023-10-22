import HorizontalCardSkeleton from "@/components/tour/card/horizontal-card-skeleton";

export default function TourListSkeleton() {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-12 px-2">
        {[...Array(5)].map((x, i) => (
          <HorizontalCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
