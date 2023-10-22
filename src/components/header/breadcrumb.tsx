export default function Breadcrumb({ items }: { items: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: { "@id": "https://travelshopbooking.com", name: "Home" },
      },
      items.map((item: any, index: number) => {
        return {
          "@type": "ListItem",
          position: index + 2,
          item: {
            "@id": "https://travelshopbooking.com" + item.pageUrl,
            name: item.pageTitle,
          },
        };
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ fontSize: 13 }}>
          <li className="breadcrumb-item">
            <a
              href="/"
              title="TravelShop Booking"
              className="text-decoration-none text-dark"
            >
              Home
            </a>
          </li>
          {items.map((item: any, i: number, row: any) => (
            <li
              key={i}
              className={
                "breadcrumb-item " + (i + 1 === row.length ? "active" : "")
              }
              aria-current="page"
            >
              {item.pageUrl ? (
                <a
                  href={item.pageUrl}
                  title={item.pageTitle}
                  className="text-decoration-none text-dark"
                >
                  {item.pageTitle}
                </a>
              ) : (
                item.pageTitle
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
