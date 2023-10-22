export default async function getUserDetail({ token }: { token: any; }) {
    const res = await fetch(
        "https://apiv2.travelshopbooking.com/rest/auth/user",
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
            },
        });

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}