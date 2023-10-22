import type { Metadata } from "next";
import Breadcrumb from "@/components/header/breadcrumb";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Contact Us | TravelShop Booking",
  description:
    "Contact TravelShop Booking for exceptional customer service and travel assistance. We&#39;re here to make your journey seamless.",
  alternates: {
    canonical: "https://travelshopbooking.com/contact-us",
  },
};

export default function ContactUspage() {
  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Contact Us", pageUrl: "/contact-us" }]}
        />
        <h1 className="h3">Contact Us</h1>
        <p>We are here to help. Kindly feel free to ask.</p>
        <div className="row">
          <div className="col-12">
            <div className="card border-light-subtle">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <p>
                      Whether you have inquiries about our thrilling travel
                      destinations, need assistance planning your dream
                      vacation, or require support throughout your journey, our
                      friendly team is here to help.
                    </p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <a
                          className="icon-link text-dark text-decoration-none"
                          href="tel:+90 549 540 54 30"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-telephone-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                            />
                          </svg>{" "}
                          +90 549 540 54 30
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a
                          className="icon-link text-dark text-decoration-none"
                          href="mailto:help@travelshopbooking.com"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                          </svg>
                          help@travelshopbooking.com
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a
                          className="icon-link text-dark text-decoration-none"
                          href="https://maps.app.goo.gl/QfduPdwYsiSJ2ypg8"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-alt-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                          </svg>
                          Sirinevler Mah. Adnan Kahveci Bulvari Karanfil Is
                          Merkezi No:184 Kat:4 D:6, 34188
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-md-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34066.15029267422!2d28.827960606142796!3d41.00226271879028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba2edf6f5f4b%3A0xdc242cbca65626a1!2sTravelShop%20Turkey!5e0!3m2!1str!2str!4v1686222591718!5m2!1str!2str"
                      width="100%"
                      height="100%"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
