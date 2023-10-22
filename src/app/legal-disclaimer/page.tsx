import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Legal Disclaimer | TravelShop Booking",
  description:
    "Read TravelShop Booking Legal Disclaimer for important information and disclosures. Trust in our transparency and expertise.",
  alternates: {
    canonical: "https://travelshopbooking.com/legal-disclaimer",
  },
};

export default function LegalDisclaimerPage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[
            { pageTitle: "Legal Disclaimer", pageUrl: "/legal-disclaimer" },
          ]}
        />
        <h1 className="h3">Legal Disclaimer</h1>
        <div className="card border-light-subtle mt-4">
          <div className="card-body">
            <p>
              <strong>
                TravelShop Booking is a Tour operator and a includes Travel
                Agencies products from all around the world hence the
                information displayed “as is” without warranty or assurance of
                any kind for the 3rd parties.
              </strong>
            </p>
            <p>
              We do not accept any responsibility or liability for the accuracy
              of content, images, videos, licenses, completeness, legality or
              reliability of the information contained in these pages whether
              partially or as a whole other than the self-promoted products. If
              you have any complaints on legitimacy of the origin or copyright
              issues related to the information published, kindly contact the
              provider as listed, directly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
