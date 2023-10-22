export default function getTourAvailability({ tourSlug, date, pax, activeCurrency, serviceType }: { tourSlug: string; date: string; pax: number; activeCurrency: any; serviceType: any | null; }) {

    var url = "https://apiv2.travelshopbooking.com/rest/b2c/availability/" + tourSlug + "?date=" + date + "&pax=" + pax + "&activeCurrency=" + activeCurrency + "&include_prices=yes&include_rooms=yes&include_customers=yes&preview=false";

    if (serviceType)
        url += "&service_type=" + serviceType

    const res = fetch(url).then((res) => res.json());

    return res;
}