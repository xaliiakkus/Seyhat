export default function postProfileUpdate({ requestData, token }: { requestData: any; token: any; }) {
    var requestBody = {
        email: requestData.email,
        password: null,
        new_password: null,
        confirm_new_password: null,
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        country_id: requestData.countryId,
        "meta[preffered_travel_styles]": requestData.travelStyles,
        "meta[preffer_lodgings]": requestData.lodgings,
        "meta[activities]": requestData.activities,
        "meta[categories]": requestData.categories,

    };

    if (requestData.newPassword != "" && requestData.currentPassword != "" && requestData.newPassword !== requestData.newPasswordAgain) {
        requestBody.password = requestData.currentPassword
        requestBody.new_password = requestData.newPassword;
        requestBody.confirm_new_password = requestData.newPasswordAgain;
    }

    const res = fetch(
        "https://api.travelshopbooking.com/auth/user/profile",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
                "Content-Language": "en",
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Origin": "https://travelshopbooking.com",
            },
            body: JSON.stringify(requestBody),
            cache: "no-store"
        }
    ).then((res) => res.json());

    return res;
}