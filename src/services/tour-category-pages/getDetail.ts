export default async function getTourCategoryPageDetail({ params }: { params: any }) {

    var queryParams = { destination: "null", category: "null", slug: "null", active: "yes" };

    if (params.destination)
        queryParams.destination = params.destination;

    if (params.category)
        queryParams.category = params.category;

    if (params.slug)
        queryParams.slug = params.slug;

    if (params.active)
        queryParams.active = params.active;

    const res = await fetch(
        "https://tour-categories.travelshopbooking.com/api/detail.php?" + new URLSearchParams(queryParams).toString(),
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Language": "en",
                "Content-type": "application/json",
            },
            cache: "force-cache"
        }
    );

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}