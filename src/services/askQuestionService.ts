export default async function sendMessage({ data }: { data: any; }) {
    const res = await fetch(
        "https://api.travelshopbooking.com/b2c/ask-question",
        {
            cache: "force-cache",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Content-Language": "en",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
            },
            body: JSON.stringify(data)
        }
    );

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}