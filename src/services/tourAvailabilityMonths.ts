export default function getTourAvailabilityMonths({ tourId }: { tourId: number; }) {

    const res = fetch(
        "https://apiv2.travelshopbooking.com/rest/b2c/pricemonths/tour/" + tourId)
        .then((res) => res.json());

    return res;
}
