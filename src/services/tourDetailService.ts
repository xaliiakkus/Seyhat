export default async function getTourDetail(slug: string) {
    const res = await fetch(
        "https://apiv2.travelshopbooking.com/rest/b2c/tours/detail/" + slug,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Language": "en",
                "Content-type": "application/json",
                "Origin": "https://travelshopbooking.com",
            },
            cache: 'force-cache'
        }
    );

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}