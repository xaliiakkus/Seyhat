export default function postSignUp({ requestData }: { requestData: any }) {
    const res = fetch(
        "https://api.travelshopbooking.com/auth/register",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Content-Language": "en",
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Origin": "https://travelshopbooking.com",
            },
            body: JSON.stringify({
                "email": requestData.email,
                "password": requestData.password,
                "phone": requestData.phone,
                "first_name": requestData.firstName,
                "last_name": requestData.lastName
            }),
            cache: "no-store"
        }
    ).then((res) => res.json());

    return res;
}