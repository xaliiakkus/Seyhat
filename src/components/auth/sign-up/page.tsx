"use client";
import { useState } from "react";
import Breadcrumb from "@/components/header/breadcrumb";
import postSignUp from "@/services/auth/signUpService";

export default function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const signUpSubmit = async () => {
    if (
      userData.email &&
      userData.firstName &&
      userData.lastName &&
      userData.phone &&
      userData.password &&
      userData.passwordAgain
    ) {
      if (userData.password !== userData.passwordAgain) {
        setErrorMessage("Passwords do not match.");
        setSubmitStatus("error");
      } else {
        if (userData.password.length < 6) {
          setErrorMessage("Your password must be at least 6 characters.");
        } else {
          setSubmitStatus("");
          setErrorMessage("");

          try {
            setLoading(true);

            const res = await postSignUp({ requestData: userData });

            if (res.code == 200) {
              setErrorMessage("");
              setSubmitStatus("success");
              setTimeout(() => {
                location.href = "/auth/log-in";
              }, 2500);
            } else {
              setErrorMessage(res.errors[Object.keys(res.errors)[0]][0]);
              setSubmitStatus("error");
            }
          } catch (error: any) {
            setSubmitStatus("error");
            setErrorMessage(
              "The e-mail address or mobile phone number is registered in our system. Please provide any other information."
            );
          }
          setLoading(false);
        }
      }
    } else {
      setErrorMessage("Please fill in the required fields.");
      setSubmitStatus("error");
    }
  };

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Authentication", pageUrl: "/auth/sign-up" }]}
        />
        <div className="row align-items-center">
          <div className="col-12 col-md-7">
            <div className="card border-light-subtle">
              <div className="card-body p-4">
                <h3>Sign up</h3>
                <p>Please enter your access information.</p>
                {submitStatus == "error" && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {submitStatus == "success" && (
                  <div className="alert alert-success" role="alert">
                    You have successfully registered. You are being directed...
                  </div>
                )}
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="nameInput" className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            firstName: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="surnameInput" className="form-label">
                        Surname <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="surnameInput"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            lastName: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="emailInput" className="form-label">
                        Email address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        autoComplete="off"
                        id="emailInput"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            email: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="phoneInput" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneInput"
                        placeholder="e.g. +1 234 5678"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            phone: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="passwordInput" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        autoComplete="new-password"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            password: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="passwordAgainInput"
                        className="form-label"
                      >
                        Password Again <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordAgainInput"
                        onChange={(event: any) => {
                          setUserData({
                            ...userData,
                            passwordAgain: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {loading ? (
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-grow spinner-grow-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status"> Loading...</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={signUpSubmit}
                  >
                    Sign up
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 text-center py-5">
            <h3>Have an account?</h3>
            <p className="mt-3">
              You can log in to our website from our login screen.
              <br />
              <a href="/auth/log-in" className="text-decoration-none">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
