export default async function getAttractions({ page }: { page: number; }) {
    const res = await fetch(
        "https://api.travelshopbooking.com/b2c/attractions?page=" + page,
        {
            cache: "force-cache",
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Content-Language": "en",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
            }
        }
    );

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}