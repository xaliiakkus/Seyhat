import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";
import getAttractionDetail from "@/services/attractionDetailService";
import ImageCarousel from "@/components/attractions-page/image-carousel";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const detail = await getAttractionDetail(params.slug);
  if (!detail) return {};

  return {
    title:
      detail.name +
      " " +
      detail.type.charAt(0).toUpperCase() +
      detail.type.slice(1) +
      " Attraction | TravelShop Booking",
    description:
      "Read about must-see " +
      detail.name +
      " " +
      detail.type +
      " attraction. TravelShop Booking offers what to do and the best places to visit in " +
      detail.name +
      " " +
      detail.type +
      ".",
    alternates: {
      canonical: "https://travelshopbooking.com/attractions/" + params.slug,
    },
  };
}

export default async function AttractionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const detail = await getAttractionDetail(params.slug);
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[
            { pageTitle: "Attractions", pageUrl: "/attractions" },
            {
              pageTitle: detail.name,
              pageUrl: `/attractions/${params.slug}`,
            },
          ]}
        />
        <h1 className="h3">{detail.name}</h1>
        <div className="row mt-4">
          <div className="col-12 col-md-6 order-md-2">
            <ImageCarousel images={detail.media} />
          </div>
          <div className="col-12 col-md-6 order-md-1">
            <div className="card border-light-subtle">
              <div
                dangerouslySetInnerHTML={{
                  __html: detail.description ? detail.description : "",
                }}
                className="card-body"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
