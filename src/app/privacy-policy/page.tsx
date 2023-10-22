import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Privacy Policy | TravelShop Booking",
  description:
    "Discover our TravelShop Booking Privacy Policy - Your data, your trust. Learn how we safeguard your information for worry-free travel planning.",
  alternates: {
    canonical: "https://travelshopbooking.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Privacy Policy", pageUrl: "/privacy-policy" }]}
        />
        <h1 className="h3">Privacy Policy</h1>
        <div className="card border-light-subtle mt-4">
          <div className="card-body">
            <strong>Who We are?</strong>
            <p>
              Travel Shop Booking & Murtis Tour is a brand with Licence Number
              5291 based in Istanbul Turkey and all contact details are provided
              below. Our profession is to band together the best operators with
              the travelers who are looking for their next adventure via our
              website platform from all around the world with the best, and
              optimum prices. You are at the right place at the right time.{" "}
            </p>
            <p>
              <strong>Address: </strong> Head Office: Sirinevler Mah. Adnan
              Kahveci Bulvarı Karanfil Is Merkezi No: 51 Kat: 4 Daire: 6 -
              Bahcelievler - Istanbul - Turkey
            </p>
            <p>
              <strong>Contact: </strong>{" "}
              <a href="mailto:help@travelshopturkey.com" target="_blank">
                help@travelshopturkey.com
              </a>{" "}
              for any kinds of your questions at any time.
            </p>
            <p>
              <strong>Call us via Whatsapp: </strong>{" "}
              <a href="tel:+905495405430">+905495405430</a>
            </p>
            <strong>What is the Privacy Policy?</strong>
            <p>
              Like all other digital markets, we collect our users’ data and
              process it during their bookings, and other additional services
              such as your name, surname, contact, payment details, and else.
              However, we believe in the importance of personal privacy, and to
              prevent all kinds of abuse and misuse cases we endeavor to treat
              all our customers’ data in a secure mode. Since May 25, 2018, all
              the individuals’ data are under the protection of the{" "}
              <a
                href="https://gdpr-info.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                General Data Protection Regulatıon (GDPR)
              </a>{" "}
              which was governed by the European Union. Travelshopbooking is
              process customers’ data according to this regulation and announces
              all the innovations from this page.
            </p>
            <strong>How and Which Data Do We Gather?</strong>
            <p>
              When you visit our website, call us, fill out a form from the web,
              email us, or book any kind of tour from our system your data is
              collected. Your full name, email, age, address, birth date,
              passport details, and else you provide are collected too when you
              book any tour or other services via our marketplace. However, your
              credit card data is collected only when you are on the payment
              step and secure via &#34;
              <a
                href="https://www.cloudflare.com/learning/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare Letsencrypt SSL Certificate
              </a>
              &#34; which means that any of our staff can not reach or screen it
              at any time for any reason.
            </p>
            <strong>When & How Your Data Used for?</strong>
            <p>
              When you decide to go for a holiday and visit our website we need
              to know and contact you both to provide the information you asked
              for and to accomplish our obligations which are:
            </p>
            <ul>
              <li>To provide you quote</li>
              <li>
                To discuss the tour you consider and the booking you have made
              </li>
              <li>To send you the requested information</li>
              <li>
                To send you the e-marketing brochures, if you submitted them to
                the mailing list
              </li>
              <li>To book your tour</li>
              <li>To receive feedback about our services</li>
              <li>
                Notifying you of the changes and arrangements to your booking
              </li>
            </ul>
            <p>
              Please note that we never rent or sell any kind of your data for
              the 3rd parties, we only forward the necessary part of it to the
              operation team to bu sure your tour and all other arrangements are
              done.{" "}
            </p>
            <p>
              Although not very often we will notify you about news, discounts,
              campaigns, and new destinations via email. However, you can
              unsubscribe from the mailing list whenever you want by clicking
              the “unsubscribe” button at the bottom of the mail we send.{" "}
            </p>
            <strong>How Long is Data Retention?</strong>
            <p>
              Travelshopbooking is a Turkey-based company and is subject to
              Turkish laws. Legally, your financial information must be kept on
              our files for five (5) years, and other kinds of data such as
              email, and phone numbers are retained for three (3) years. Please
              keep in mind that Travelshopbooking always takes precautions and
              uses the newest ways of data protection and periodically
              deletes/removes expired data.
            </p>
            <strong>About Blogs, Images, Photographs…</strong>
            <p>
              We share the photographs, reviews, and blogs that are taken during
              the tour by our guides or sent by you after the tours. These are
              generally group photos taken at the end of the tour by our guide,
              the ones sent by you after the tour or the forms asked to populate
              them via email. During the tours, we verbally ask your permission
              to both take photos and send forms via email. However, if you do
              not agree with any of these, during or after the tour the process
              ends, just say it. We use that data on our social media accounts
              and blog by tagging you.{" "}
            </p>
            <p>
              In addition to this, if you mention one of our tours and share a
              photograph on your blog and notify us about this, we first ask
              your permission and then share it through our blog and social
              media accounts by quoting your account.
            </p>
            <p>
              However, if you change your mind, have questions, or wish to send
              new photos or blogs, just write to us at{" "}
              <a href="mailto:help@travelshopturkey.com" target="_blank">
                help@travelshopturkey.com
              </a>
              , so we can remove or add them.
            </p>
            <strong>What About Mail Marketing</strong>
            <p>
              With your permission, although not very often, we inform you
              about;
            </p>
            <ul>
              <li>our new tours,</li>
              <li>destinations,</li>
              <li>discounts,</li>
              <li>news,</li>
              <li>to remind deadline of your credits,</li>
              <li>the new tours that you might be interested in,</li>
              <li>campaigns,</li>
            </ul>
            <p>via email on the mail marketing process.</p>
            <p>
              This process starts with asking you to submit our mailing list,
              and if you submit your name and email, it will be added to the
              mailing list. All the emails that we send you include an
              &#34;unsubscribe&#34; button at the end of the page, so you can
              unsubscribe whenever you want. Travelshopbooking respects the
              customer&#39s privacy and never shares, sells, or rents any of its
              customers&#39 names, phone numbers, addresses, or emails with any
              third party. All this information is secure on our servers and
              protected.{" "}
            </p>
            <p>
              <i>So who can access your data?</i> Only Travelshopbooking and our
              developers can access it. Nevertheless, they are legally
              responsible for securing your data and privacy too. However, if
              you share your information with a tour operator or any other site,
              we do not accept any responsibility for their privacy practices.
            </p>
            <strong>What about POP-UPS?</strong>
            <p>
              While you are browsing our website you will see a small number of
              pop-ups and they store data too. However, Travelshopbooking
              organizes these pop-ups internally, not in connection with the
              external services, so all the data coming via pop-ups is stored
              and secure only in our servers.{" "}
            </p>
            <strong>How do We Use Google And Cookies?</strong>
            <p>
              Like pop-ups, Travelshopbooking uses a small number of{" "}
              <a
                href="https://www.aboutcookies.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                cookies
              </a>{" "}
              on our pages. Also, we use Google remarketing practices and Google
              Analytics for advertising purposes. You can edit or turn off your
              preferences{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{" "}
              and opt-out from or learn more about Google Analytics{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
            <p>
              Please do not hesitate to contact any kind of questions at{" "}
              <a href="mailto:help@travelshopturkey.com" target="_blank">
                help@travelshopturkey.com
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
