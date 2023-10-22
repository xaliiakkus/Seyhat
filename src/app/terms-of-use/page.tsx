import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Terms of Use | TravelShop Booking",
  description:
    "Explore the TravelShop Booking Site Terms of Use for clear guidelines and policies. Please read and fully understand the TravelShop Booking Terms and Conditions.",
  alternates: {
    canonical: "https://travelshopbooking.com/terms-of-use",
  },
};

export default function TermsPage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Terms of Use", pageUrl: "/terms-of-use" }]}
        />
        <h1 className="h3">Terms of Use</h1>
        <div className="card border-light-subtle mt-4">
          <div className="card-body">
            <h4>1. Pricing Tour Options</h4>
            <p>
              TravelShop Booking offers many travel options, tours, packages and
              other services with three different hotel category options within
              each tour. These range from carefully selected 3, 4, & 5 star
              hotels all around Turkey. Prices are set in November and are valid
              for a year coomonly. Prices will be maintained for bookings
              outside this period on receipt of the deposit. Our prices are
              fixed up until April 2022 due to Covid- 19 outbreak.
            </p>
            <h5>1.1 Land Tours</h5>
            <p>
              Tours may be booked without hotel accommodation if you prefer to
              book your own hotel. We have given the name of “Land Tour” to this
              type of tour. Prices include all items mentioned under TOUR
              INCLUDES lists, but exclude hotel accommodation, breakfasts and
              dinners. You will not be refunded for any of the services included
              in the tour which you do not use.
            </p>
            <h4>2. Reservation - Deposit – Payments</h4>
            <h5>2.1 Reservation</h5>
            <p>
              Having fully explored the TravelShop Booking website and found a
              tour which suits you, simply complete the short booking form
              located at the bottom of each tour itinerary page or call our
              office in Istanbul on 0090 549 540 5402. We will check
              availability for your preferred date and respond by e-mail or
              telephone. Once availability has been confirmed and you are happy
              to go ahead with the booking, we charge a booking deposit to your
              credit card. An e-mail confirming all the details of the tour,
              including hotel name and domestic flights if booked with us, will
              be sent to you immediately. Most importantly, please ensure you
              send us your full name as per your passport so we can make your
              flight reservations correctly.
            </p>
            <h5>2.2 Deposit and Payments</h5>
            <p>
              Tour payments are divided into 3 steps. Your reservation will be
              confirmed upon receipt of your online order and a non-refundable
              deposit as shown in the table below. Progressive payment is then
              due as indicated below. All cancellations are subject to a written
              request and to be confirmed in return.
            </p>
            <p>
              Land tours “only” cancellation policy: Fully refundable in any
              cases and credit towards to the next event under Force Majeure
              conditions
            </p>
            <p>
              Tours with domestic flight cancellation policy: Booking day 50 %
              Non-refundable, 5 Weeks before 50% credit, 4 Weeks before
              Non-refundable
            </p>
            <p>
              These payments can be made via credit card, bank transfer or
              travellers cheque. Please find below TravelShop Booking bank
              details for booking via bank transfer.
            </p>

            <div className="mb-3">
              <span>
                <strong>Account Name: </strong>Bodrum Kalender Otelcilik ve
                Yatcilik, Turizm, Seyahat Limited Sirketi
              </span>
              <br />
              <span>
                <strong>Bank Name: </strong>ZIRAAT BANKASI
              </span>
              <br />{" "}
              <span>
                <strong>Bank Branch: </strong>Sirinevler-Istanbul Subesi
              </span>
              <br />{" "}
              <span>
                <strong>Bank Branch Code: </strong>826
              </span>
              <br /> <br />{" "}
              <span>
                <strong>€ - EURO IBAN: </strong>TR660001000826614727715007
              </span>
              <br />{" "}
              <span>
                <strong>$ - USD IBAN: </strong>TR230001000826614727715005
              </span>
              <br />{" "}
              <span>
                <strong>£ - GBP IBAN: </strong>TR390001000826614727715008
              </span>
              <br />
              <span>
                <strong>₺ - TL IBAN: </strong>TR500001000826614727715004
              </span>
              <br />{" "}
              <span>
                <strong>Swift Code(BIC): </strong>TCZBTR2A
              </span>
            </div>

            <p>
              Visa and Mastercard payments can be charged in Dollars, Pounds,
              Euro or Turkish Lira. A 4% bank fee will be charged if payment is
              made via American Express. Other payment methods are free of fee
              charges. You may also contact us for other payment methods.
            </p>
            <p>
              The full amount of your tour must be paid 14 days before the tour
              start date. If full payment is not received by this time we
              consider it a cancellation and cancellation penalties will apply.
              If you have booked any of our tours including domestic flight
              tickets, then cancellation penalties and the full amount of the
              flights will be charged.
            </p>
            <p>
              A reservation can be changed only if space is available. An entire
              reservation that is changed will be considered a cancellation and
              will be subject to cancellation fees (100% loss of deposit).
            </p>
            <h5>2.3 Booking Changes</h5>
            <p>
              Once your booking in confirmed, the first change on your services
              is free. For subsequent changes a €50.00 fee will be charged.
            </p>
            <h4>Cancellation and Refunds</h4>
            <p>
              Cancellations must be made in writing and signed by the tour
              participants. In the event that a tour participant cancels his or
              her reservation, the cancellation penalty may apply. The
              reservation deposit of 15% will not be refunded in case of any
              cancellations that are outside the Force Majeure conditions.{" "}
            </p>
            <p>
              Under any circumstances, there will be no refund for the promoted
              tours. The balance will be identified as &#34;Future Tour
              Credits&#34; to use in the future. Please contact{" "}
              <a href="mailto:help@travelshopbooking.com" target="_blank">
                help@travelshopbooking.com
              </a>{" "}
              or your tour operator to change tour dates and other details.
            </p>
            <h4>Guarantee Prices</h4>
            <p>
              Our price guarantees that no increase in land costs will occur
              once you have paid the deposit for your tour. This is your
              protection against international currency fluctuations. When you
              have paid for your domestic flight in full, there will be no
              change in the cost of the ticket, even if airfares rise later.
            </p>
            <h4>Last Minute Bookings</h4>
            <p>
              The price of your domestic flights may change when booking at last
              minute. Prices indicated are subject to flight availability and a
              minimum of 4 weeks notification prior to the commencement of your
              tour. Your last minute land tours will be arranged according to
              the availability of services. Prices will not change, unless
              TravelShop Booking has to make any change or add any extra service
              for the last minute booking.
            </p>
            <h4>Discounts / Special Offers</h4>
            <p>
              On all discounted tours full payment required at the time of
              booking. When booking any of our tours in advance, please ask us
              about any available discounts. Please follow all available
              discounts by DEALS button on the Homepage.
            </p>
            <table className="table table-responsive table-bordered mt-20 mb-20 table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>UNDER 2 YEARS OLD</th>
                  <th>2-6 Years OLD</th>
                  <th>7-11 YEARS OLD</th>
                  <th>ABOVE 11 YEARS OLD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LAND TOURS</td>
                  <td>Free</td>
                  <td>Free</td>
                  <td>25%</td>
                  <td>Full amount</td>
                </tr>
                <tr>
                  <td>TOURS WITH DOMESTIC FLIGHTS</td>
                  <td>Euro 20 for flight tickets</td>
                  <td>50%</td>
                  <td>25%</td>
                  <td>Full amount</td>
                </tr>
                <tr>
                  <td>BABY SEAT REQUEST FOR BUS*</td>
                  <td>+25%</td>
                  <td>+25%</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>

            <p>
              *Baby seats for buses will have an extra charge of 25% of the tour
              cost and they must be requested prior to the starting date of the
              tour. Where the baby is carried by the parents, there will be no
              extra charge. **Children under 18 years old must be accompanied by
              an adult, without exception.
            </p>
            <h4>Group Tours</h4>
            <p>
              Please ask for special group discounts if you are a group of more
              than 6 people. For the accommodation, we can manage single, double
              and triple rooms depending on the number of people and according
              to availability. Note that in some periods of the year, the group
              sizes will be from 10 to a maximum of 30. In such cases, you may
              be eligible for Private Tours which would be much convenient and
              affordable.
            </p>
            <h4>Before Your Travel </h4>
            <p>
              A copy of all your flight tickets, tour voucher, itinerary, hotel
              contact information and confirmation email will be sent to you
              upon request before your arrival in Turkey. We also give this to
              you in your welcome pack upon arrival at the airport. You should
              check all the information carefully (names, arrival and departure
              times, flight details...) and notify us immediately of any
              discrepancies, as once booked and confirmed we will not take
              responsibility for any errors in this information.
            </p>
            <h4>Upon Arrival</h4>
            <p>
              When you arrive after your customs and baggage collection, our
              friendly staff will be waiting with your name and a TravelShop
              Booking sign at the arrivals gate’s designated spot. They will
              assist you to our transportation and with your onward tour.
            </p>
            <p>
              Please keep in mind that a maximum of 15-20 kilos are allowed on
              domestic flights. For international flights, check with your
              provider before packing. Please also check with your local
              authorities for travelling abroad for COVID-19 procedures and act
              accordingly. For Turkish Governmental requirements, please check
              the “72 Hour Prior Notice” on the Homepage Menu.{" "}
            </p>
            <h4>Travel Insurance</h4>
            <p>
              Though we do not provide, we recommend that you purchase travel
              insurance for the same reason that you have house and car
              insurance - to protect you, your loved ones, your possessions and
              your travel investment. If you or your family have unexpected
              health problems, experience flight delays or have possessions
              stolen during your vacation, you will be covered for costs.
            </p>
            <h4>Transportation</h4>
            <p>
              All the buses we use are luxury, air conditioned buses. Most of
              them have TV and freezer available and our luxury Mercedes
              Sprinters have internet and mini bar available. All of the buses
              used intercity are very clean, comfortable and safe. You will see
              a lot of interesting and beautiful views during the journey. For
              long bus journeys, we provide a small rest break every 2.5 hours.
              *We will allocate the bus according to the availability and the
              number of pax requested. *Please keep in mind our bus luggage
              restriction. We need to leave some free seats for Pandemic
              measurements.
            </p>
            <h4>Passports & Visas</h4>
            <p>
              You are responsible for ensuring that you have all the necessary
              travel documents and that they are valid and effective. You will
              need a current passport that is valid for at least 6 months and
              the necessary visa documentation. Passengers must apply for and
              obtain a multiple entry Turkey visa for our Turkey programmes,
              multiple entry Schengen visa for our Greek tour programmes and
              Single entry tourist visa for our Egypt programmes. If you take a
              tour in North Cyprus, you will need a double entry visa.
            </p>
            <p>
              TravelShop Booking will provide invitation letters to obtain any
              of these visas for those who have booked and paid a deposit. The
              cost of visas is not included in your tour package. Check your
              local embassy and the information below for visa procedures.
            </p>
            <p>
              For up to date Turkey visa information from the Turkish Ministry
              of Foreign Affairs follow this link:
              www.mfa.gov.tr/visa-information-for-foreigners.en.mfa{" "}
            </p>
            <p>
              Citizens of most countries can obtain a visa at the border. For up
              to date border information from the Turkish Ministry of Foreign
              Affairs follow this link:
              www.mfa.gov.tr/visa-fees-at-border-gates-for-2010.en.mfa{" "}
            </p>
            <p>
              At Istanbul Airport (IST) you can get your visa at the visa
              counter on your left just before the passport control area.
              Passport control will send you back to the visa section if you do
              not have a valid visa. It&#39;s a good idea to have the correct
              money in the correct currency for your visa.
            </p>
            <p>
              As of April 17, 2013, electronic visa (e-Visa) replaces “sticker
              visa” which was issued at the border crossings. Applicants just
              need to log on to the following link, provide the requested
              information, (after the application is approved) make online
              payment and download their e-Visa: www.evisa.gov.tr
            </p>
            <p>
              TravelShop Booking Murtis Tour reserves the right to decline,
              accept or retain any person as a tour passenger should such
              person&#39;s health, mental condition, physical infirmity or
              general attitude impede the operation of the tour or the rights,
              welfare or enjoyment of other tour passengers. Please let staff
              know if you have any health problems when you are making your
              booking.
            </p>
            <p>
              Passengers will be prohibited from travelling in the event of
              pregnancy in advance of 27 weeks or more in accordance with the
              terms of their own safety and their own health. Travel may be
              permitted in the instance where sufficient medical documentation
              is provided till 24- 26 weeks of the pregnancy.
            </p>
            <p>
              TravelShop Booking provides private services for handicapped
              people with prior request. Please contact our staff to make
              arrangements.
            </p>
            <p>
              Special dietary requirements of passengers are catered for in the
              menu including vegetarian, diabetic, children menus and
              dairy-free. For meal requests, please confirm with TravelShop
              Booking Murtis Tour at least 2 weeks before your tour start date.
              As you know, around the world you do not have to pay tips if you
              are not happy with the service, but especially in Turkey, tipping
              is a cultural fact. People who give you good service expect a tip.
            </p>
            <p>
              Our company will always give you quality service, but we do not
              include tips in our package prices. Normally, tour guide tips are
              2 Euro per person per day while driver tips are 1 euro per person
              per day. This will vary according to the quality of their service,
              so it will be up to customer to decide on the given amount.
              Remember this is not an obligatory service, but rather a part of
              the Turkish culture.
            </p>
            <strong>
              For further information, please contact directly with your Tour
              Operator.
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}
