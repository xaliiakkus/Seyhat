import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "About Us | TravelShop Booking",
  description:
    "Dedicated to multi-day tours and organized adventures, TravelShopBooking is your adventure booking platform. Explore our company's mission, values, and principles.",
  alternates: {
    canonical: "https://travelshopbooking.com/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb items={[{ pageTitle: "About Us", pageUrl: "/about-us" }]} />
        <h1 className="h3">About Us</h1>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-light-subtle">
              <div className="card-body">
                {/* <div className="text-center my-3">
                  <Image
                    src="/images/header/logo/logo.svg"
                    alt="TravelShop Booking"
                    width={175}
                    height={60}
                    quality={100}
                  />
                </div> */}
                <p>
                  TSG has roots in Bodrum, the tourism pearl of Turkey. Prior to
                  establishing ourselves as a dedicated tourism company, we
                  worked as group leaders from 1990 to 2005. In 2005, our love
                  for travel blossomed as we began hosting numerous guests at
                  the Bodrum Kalender Hotel. Next TravelShop Turkey was founded
                  on Valentine&#39;s Day in 2006. TSG experienced rapid growth,
                  leading us to relocate to Istanbul in 2009. Our services
                  expanded in line with this growth, encompassing Congress
                  tourism, MICE, weddings, a diverse array of Turkey-related
                  categories, and even Formula 1.
                </p>
                <p>
                  In 2015, we began offering Anzac Tours, which culminated in a
                  special cruise in 2018, serving 3,500 passengers. Starting
                  from Sydney and ending in Brisbane, the Anzac-inspired tour
                  included stops in Egypt, Gallipoli, Canakkale for the Dawn
                  Service, and Istanbul. The meticulously planned itinerary
                  offered customized arrival hours, sightseeing locations, and
                  continuous shuttle services. The success of it led us to
                  future high-participation organizations With a deep
                  understanding of the importance of connectivity and a wide
                  network, TSG launched Workshop TravelShop in 2016. Since then,
                  we have organized over 27+ international fairs worldwide,
                  bringing together experts.
                </p>
                <p>
                  The TSG Group now includes the brands Murti&#39;s Tour
                  (Murti&#39;s Tour Seyahat Acentasi), which is a member of
                  TURSAB with the member ID A5291, TravelShop Turkey, TravelShop
                  Booking, WorkShop TravelShop, and El Puente Cave Hotel, and
                  has representative offices in the United States, England,
                  India, the Philippines, Vietnam, Russia, South Africa, Spain,
                  and Italy.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-6">
            <div className="card border-light-subtle">
              <div className="card-body">
                <h4 className="card-title">What we did</h4>
                <p>
                  TravelShop Booking invested to its own, completely new
                  software and worked with the bests of the sector to simplify
                  the booking process for both operators and travelling lovers.
                  Today in the TravelShop Booking’s pages it is possible to find
                  the best packegess, responsible operators, money safe tours
                  and latest, interesting travelling contents througout the
                  blog. However these are just the introduction of the story,
                  the team is working to improve all services to boost the best
                  travelling experince.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card border-light-subtle">
              <div className="card-body">
                <h4 className="card-title">What we aim for</h4>
                <p>
                  Travelling is not a holiday or a memorible, relaxing moments
                  for us. It is some how to explore the univers we live in, to
                  set up and raise ties with the people we never know and to
                  enrich with the new cultures, beliefs and way of breaths. The
                  aim that we are working to achieve is to make this possible
                  via bringing people together with the tours to all around the
                  world. So procuring new destinations, and flexible tours for
                  every interest as well as make arrange them luxury or
                  reasonable is the goal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/business-departments.9b8807f.jpg"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">
                  Technology and Engineering
                </h5>
                <p>
                  Today&#39;s challenge encompasses a broad spectrum, spanning
                  from engineering to art, and requires adaptation to changing
                  times. TSG&#39;s IT team is diligently striving to enhance the
                  travel experience for both travelers and experts, as well as
                  B2B and B2C partners.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/grow.1b92c80.png"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Growth and Expansion</h5>
                <p>
                  The Business Development team is forging new partnerships with
                  trailblazers in the travel industry to expand their network.
                  By bringing on board fresh names and brands from the global
                  travel sector, their objective is to foster growth through
                  collaboration.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/advancement.9fea5db.jpg"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Product Advancement</h5>
                <p>
                  A collective of travel enthusiasts is exploring novel
                  experiential themes and uncovering uncharted routes. Their
                  unwavering devotion to travel is the driving force behind
                  their tireless efforts. Their ultimate goal is to elicit a
                  response from fellow travelers that says, &quot;I never
                  considered this before; it&#39;s new and I must try it.&quot;
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/support.d828cc5.jpg"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Support Desk</h5>
                <p>
                  TSG&#39;s Customer Support Office is one of the most
                  formidable departments, dedicated to swiftly and energetically
                  resolving any issues you may encounter. No matter where you
                  are or when you need it, you can rest assured that their
                  assistance will be right there for you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/marketing.bd956a0.png"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Marketing</h5>
                <p>
                  TSG recognizes that marketing is crucial for growth and
                  influence, and as such, the marketing team is diligently
                  working to reach global audiences through campaigns and
                  high-quality content creation. Ultimately, success lies in
                  crafting a compelling narrative that resonates with everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4 mt-4">
            <div className="card border-light-subtle">
              <Image
                src="/images/about-us/finance-management1.4c4d9ad.webp"
                alt=""
                width={400}
                height={300}
                className="img-fluid rounded-top mx-auto card-img-top"
                loading="lazy"
                style={{ height: "220px" }}
                quality={100}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Finance Office</h5>
                <p>
                  Equipped with exceptional problem-solving abilities and an
                  unwavering commitment to simplifying complex processes, we
                  guarantee seamless day-to-day operations. Our comprehensive
                  services cater to a broad spectrum, spanning from our own TSG
                  team members to our valued partners and operators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
