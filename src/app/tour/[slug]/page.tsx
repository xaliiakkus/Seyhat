import type { Metadata } from "next";
import { notFound } from "next/navigation";
import getTourDetail from "@/services/tourDetailService";
import Page from "@/components/tour-detail-page/page";
import getTourCategoryPageDetail from "@/services/tour-category-pages/getDetail";

export const dynamicParams = true;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const data = await getTourDetail(params.slug);

    return {
      title: data.name + " | TravelShop Booking",
      description:
        "TravelShop Booking is to help you enjoy all the fun of exploring our fascinating world. Click and view " +
        data.name +
        " details.",
      alternates: {
        canonical: "https://travelshopbooking.com/tour/" + params.slug,
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const data = await getTourDetail(params.slug);
    var breadcrumb = [{ pageTitle: "Tour", pageUrl: "/" }];

    try {
      const tourBreadcrumbPage = await getTourCategoryPageDetail({
        params: {
          destination: data.routes[0]?.slug,
          category: data.category?.slug,
          active: "null",
        },
      });
      breadcrumb = tourBreadcrumbPage.data.parentCategories.map(
        (item: any) => ({
          pageTitle: item.breadcrumbTitle,
          pageUrl: item.isActive == "1" ? `/${item.pageUrl}` : "/",
        })
      );

      breadcrumb.push({
        pageTitle: tourBreadcrumbPage.data.breadcrumbTitle,
        pageUrl:
          tourBreadcrumbPage.data.isActive == "1"
            ? `/${tourBreadcrumbPage.data.pageUrl}`
            : "/",
      });
    } catch (error) {
      try {
        const tourBreadcrumbPage = await getTourCategoryPageDetail({
          params: {
            destination: data.routes[0]?.slug,
            active: "null",
          },
        });
        breadcrumb = tourBreadcrumbPage.data.parentCategories.map(
          (item: any) => ({
            pageTitle: item.breadcrumbTitle,
            pageUrl: item.isActive == "1" ? `/${item.pageUrl}` : "/",
          })
        );

        breadcrumb.push({
          pageTitle: tourBreadcrumbPage.data.breadcrumbTitle,
          pageUrl:
            tourBreadcrumbPage.data.isActive == "1"
              ? `/${tourBreadcrumbPage.data.pageUrl}`
              : "/",
        });
      } catch (error) {}
    }

    return <Page tourData={data} breadcrumb={breadcrumb} />;
  } catch (error) {
    return notFound();
  }
}
