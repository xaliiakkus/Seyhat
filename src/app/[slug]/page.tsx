import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import getData from "@/services/filterPageService";
import Page from "@/components/tour-category-page/page";
import getTourCategoryPageDetail from "@/services/tour-category-pages/getDetail";

export const dynamicParams = true;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    var tourCategoryPage = await getTourCategoryPageDetail({
      params: { slug: params.slug },
    });
  } catch (error) {
    return {};
  }

  return {
    title: tourCategoryPage.data.metaTitle + " | TravelShop Booking",
    description: tourCategoryPage.data.metaDescription,
    alternates: {
      canonical: "https://travelshopbooking.com/" + params.slug,
    },
  };
}

export default async function TourCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();

  try {
    var tourCategoryPage = await getTourCategoryPageDetail({
      params: { slug: params.slug },
    });
  } catch (error) {
    return notFound();
  }

  var pageParams = {
    title: tourCategoryPage.data.pageTitle,
    pageUrl: tourCategoryPage.data.pageUrl,
    breadcrumbTitle: tourCategoryPage.data.breadcrumbTitle,
    shortDescription: tourCategoryPage.data.pageShortDescription,
    longDescription: tourCategoryPage.data.pageLongDescription,
    destination: tourCategoryPage.data.paramDestination,
    category: tourCategoryPage.data.paramCategory,
    parentCategories: tourCategoryPage.data.parentCategories.map(
      (item: any) => ({
        pageTitle: item.breadcrumbTitle,
        pageUrl: `/${item.pageUrl}`,
      })
    ),
  };

  const data = await getData({
    params: pageParams,
    page: 1,
    filterData: {},
    currency: cookieStore.get("currency")?.value,
  });

  data.tours = data.tours.sort(() => 0.5 - Math.random());

  return <Page params={pageParams} tourData={data} />;
}
