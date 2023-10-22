export default function getTourPricing(tourIds: number[], currency: any) {
    const res = fetch(
        "https://apiv2.travelshopbooking.com/rest/b2c/prices/tour",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ "ssr": true, "ids": tourIds, "b2c": "yes", "activeCurrency": currency, "roomType": "dbl" }),
            cache: "no-store"
        }
    ).then((res) => res.json());

    return res;
}