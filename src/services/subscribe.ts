export default function postSubscribe(email: string) {
    const res = fetch(
        "https://api.travelshopbooking.com/b2c/subscribe",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email }),
            cache: "no-store"
        }
    ).then((res) => res.json());

    return res;
}