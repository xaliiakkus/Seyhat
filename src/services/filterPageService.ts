export default async function getData({ params, page, filterData, currency }: { params: any; page: number; filterData: any; currency: any; }) {
    var requestBody = {
        activeCurrency: currency,
        page,
        filter:
            "name,slug,map,rating,image,image_resize_link,description,routes,languages,defaults,is_regular,is_private,promotion,rating,currency,price,old_price,startLocation,endLocation,id,price_per_day,hasPromotion",
        withFilters: "yes",
        withLowest: "yes",
        aggregation: [
            "defaults.regular",
            "defaults.private",
            "languages.id.keyword",
        ],
        aggraw: {
            activities_name_en_keyword: {
                terms: { field: "activities.name.en.keyword", size: 10000 },
                aggs: {
                    activities_sid_keyword: {
                        terms: { field: "activities.sid.keyword", size: 1 },
                        aggs: {
                            activities_category_id: {
                                terms: { field: "activities.category_id", size: 1 },
                            },
                        },
                    },
                },
            },
            accommodation_types_sid_keyword: {
                terms: { field: "accommodation_types.sid.keyword", size: 10000 },
                aggs: {
                    accommodation_types_name_en_keyword: {
                        terms: {
                            field: "accommodation_types.name.en.keyword",
                            size: 1,
                        },
                    },
                },
            },
            guide_type_sid_keyword: {
                terms: { field: "guide_type.sid.keyword", size: 10000 },
                aggs: {
                    guide_type_name_keyword: {
                        terms: { field: "guide_type.name.en.keyword", size: 1 },
                    },
                },
            },
        },
        multiagg: [
            "category.name.en.keyword;category.slug.keyword:category.id",
        ],
        order: "sales",
        order_dir: "desc",
        ...filterData
    };

    if (params.destination)
        requestBody.destination = params.destination;

    if (params.category)
        requestBody.category = params.category;

    const res = await fetch(
        "https://apiv2.travelshopbooking.com/rest/b2c/tours/search",
        {
            cache: "force-cache",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Content-Language": "en",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Origin": "https://travelshopbooking.com",
            },
            body: JSON.stringify(requestBody),
        }
    );

    if (!res.ok)
        throw new Error("Failed to fetch data");

    return res.json();
}