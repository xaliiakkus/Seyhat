export default function getLocations() {

    const res = fetch(
        "https://apiv2.travelshopbooking.com/rest/locations?ssr=true&types[]=country&columns[]=id&columns[]=name&columns[]=slug&columns[]=phone_code")
        .then((res) => res.json());

    return res;
}