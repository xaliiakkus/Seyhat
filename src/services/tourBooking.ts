export default function postBooking({ slug, requestParameters }: { slug: string; requestParameters: any; }) {
    const res = fetch(
        "https://apiv2.travelshopbooking.com/rest/b2c/book/" + slug,
        {
            method: "POST",
            headers: {
                "Content-type": "application / json",
            },
            body: JSON.stringify(requestParameters),
            cache: "no-store"
        }
    ).then((res) => res.json());

    return res;
}