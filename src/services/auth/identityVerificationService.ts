export default async function getIdentityVerification({ email, password }: { email: string | undefined; password: string | undefined; }) {
    const res = await fetch(
        "https://apiv2.travelshopbooking.com/rest/auth/login",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username: email, password, "platform": "client" }),
            cache: "no-store"
        });

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}