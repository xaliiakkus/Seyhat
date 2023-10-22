import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import getUserDetail from "@/services/auth/userDetail";
import sendMessage from "@/services/askQuestionService";

export default function InquiryModal({ tourId }: { tourId: number }) {
  const [loading, setLoading] = useState(true);
  const [messageSendLoading, setMessageSendLoading] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bodyContent, setBodyContent] = useState("form");

  const fetchUserDetail = async () => {
    const userData = await getUserDetail({ token: getCookie("auth-token") });
    return userData;
  };

  const formSubmit = () => {
    if (customerName == "" || customerEmail == "" || question == "") {
      setShowError(true);
      setErrorMessage("Please fill in the required fields");
      return;
    }

    setShowError(false);
    setErrorMessage("");
    setMessageSendLoading(true);

    sendMessage({
      data: {
        model: "Tour",
        model_type: "tour",
        model_id: tourId,
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        message: question,
      },
    })
      .then((res) => {
        setMessageSendLoading(false);
        setBodyContent("success");
      })
      .catch((error) => {
        setMessageSendLoading(false);
        setErrorMessage("There is a problem. Please try again later.");
        setShowError(true);
      });
  };

  useEffect(() => {
    if (hasCookie("auth-token")) {
      fetchUserDetail().then((res: any) => {
        setIsActiveUser(true);
        setCustomerName(res.name);
        setCustomerPhone(res.phone);
        setCustomerEmail(res.email);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="inquiryFormModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="inquiryFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title h1 fs-5" id="inquiryFormLabel">
              Ask a Question
            </span>
            {!messageSendLoading && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            )}
          </div>
          <div className="modal-body">
            {loading && "Loading..."}
            {!loading &&
              !messageSendLoading &&
              bodyContent == "success" &&
              "Your message has been delivered successfully. We will get back to you as soon as possible."}
            {!loading && !messageSendLoading && bodyContent == "form" && (
              <>
                <p>
                  {isActiveUser && (
                    <span>
                      Hello <strong>{customerName}</strong> happy to see you
                      here.
                      <br />
                    </span>
                  )}
                  Ask questions to the tour provider.
                </p>
                {showError && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {!isActiveUser && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="inquiryFormName" className="form-label">
                        Name <span className="text-danger"> (*)</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inquiryFormName"
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                        }}
                        defaultValue={customerName}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inquiryFormEmail" className="form-label">
                        Email address <span className="text-danger"> (*)</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inquiryFormEmail"
                        onChange={(e) => {
                          setCustomerEmail(e.target.value);
                        }}
                        defaultValue={customerEmail}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inquiryFormPhone" className="form-label">
                        Phone <small>(Optional)</small>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="e.g. +1 234 5678"
                        id="inquiryFormPhone"
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                        }}
                        defaultValue={customerPhone}
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label
                    htmlFor="inquiryFormEmailQuestion"
                    className="form-label"
                  >
                    Your Question <span className="text-danger"> (*)</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="inquiryFormEmailQuestion"
                    rows={5}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    defaultValue={question}
                  ></textarea>
                </div>
              </>
            )}
            {messageSendLoading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Your message is being sent. Please wait.</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {messageSendLoading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Sending...</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {!messageSendLoading && bodyContent == "form" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      formSubmit();
                    }}
                  >
                    Send Message
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
