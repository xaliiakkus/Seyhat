"use client";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import getUserDetail from "@/services/auth/userDetail";
import Breadcrumb from "@/components/header/breadcrumb";
import postProfileUpdate from "@/services/auth/profile/updateProfile";

export default function Page() {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
    countryId: "",
    travelStyles: [],
    lodgings: [],
    activities: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const updateSubmit = async () => {
    if (userData.email && userData.firstName && userData.lastName) {
      if (
        userData.currentPassword != "" &&
        userData.currentPassword != "" &&
        userData.newPassword !== userData.newPasswordAgain
      ) {
        setErrorMessage("Passwords do not match.");
        setSubmitStatus("error");
      } else {
        if (
          userData.currentPassword != "" &&
          userData.newPassword !== userData.newPasswordAgain &&
          userData.newPassword.length < 6
        ) {
          setErrorMessage("Your password must be at least 6 characters.");
        } else {
          setSubmitStatus("");
          setErrorMessage("");

          try {
            setLoading(true);

            const res = await postProfileUpdate({
              requestData: userData,
              token: getCookie("auth-token"),
            });

            if (res.success) {
              setErrorMessage("");
              setSubmitStatus("success");
            } else {
              setErrorMessage(res.errors[Object.keys(res.errors)[0]][0]);
              setSubmitStatus("error");
            }
          } catch (error: any) {
            setSubmitStatus("error");
            setErrorMessage(
              "The e-mail address is registered in our system. Please provide any other information."
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

  const fetchUserDetail = async () => {
    const userData = await getUserDetail({ token: getCookie("auth-token") });
    return userData;
  };

  useEffect(() => {
    if (hasCookie("auth-token")) {
      try {
        fetchUserDetail().then((res: any) => {
          setUserData({
            name: res.name,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
            currentPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            countryId: res.country_id,
            travelStyles: res.meta.preffered_travel_styles,
            lodgings: res.meta.preffer_lodgings,
            activities: res.meta.activities,
            categories: res.meta.categories,
          });
          setUser({ name: res.name, email: res.email });
          setUserLoading(false);
        });
      } catch (e) {}
    } else {
      setUserLoading(false);
    }
  }, []);

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb items={[]} />
        <h1 className="h3">Profile</h1>

        <div className="row mt-3">
          <div className="col-12 col-md-3 mb-3">
            <nav className="p-0 navbar navbar-expand-md">
              <div className="container-xxl p-0">
                <button
                  className="btn btn-sm navbar-toggler mx-auto border-0 mb-3 w-100"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#profileMenu"
                  aria-controls="profileMenu"
                  aria-expanded="false"
                  aria-label="Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-list"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                  Profile Menu
                </button>
                <div
                  className="card p-0 card-body collapse navbar-collapse placeholder-glow border-light-subtle"
                  id="profileMenu"
                >
                  <div className="p-3 text-center">
                    {userLoading && (
                      <div className="placeholder-glow">
                        <span className="placeholder placeholder-sm col-12">
                          --------------------------------------
                        </span>
                      </div>
                    )}
                    {!userLoading && (
                      <p>
                        <strong>{user.name}</strong>
                        <br />
                        {user.email}
                      </p>
                    )}
                  </div>
                  <ul className="nav list-group list-group-flush w-100">
                    <a
                      href="/profile"
                      className="nav-item list-group-item list-group-item-action px-3 rounded-0 active"
                    >
                      Profile
                    </a>
                    <a
                      href="/profile/bookings-enquiries"
                      className="nav-item list-group-item list-group-item-action px-3"
                    >
                      Enquiries &amp; Bookings
                    </a>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9">
            <div className="card border-light-subtle">
              <div className="card-body">
                {userLoading && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading. Please wait.</p>
                  </div>
                )}
                {!userLoading && (
                  <>
                    <h4>Personal Information</h4>
                    <p>You can update your personal information.</p>
                    {submitStatus == "error" && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    {submitStatus == "success" && (
                      <div className="alert alert-success" role="alert">
                        Your information has been saved.
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
                            value={userData.firstName}
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
                            value={userData.lastName}
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
                            value={userData.email}
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
                      <div className="col-12 col-md-6"></div>
                    </div>
                    <h4 className="mt-3">Security Information</h4>
                    <p>You can update your password.</p>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="passwordInput" className="form-label">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            autoComplete="new-password"
                            onChange={(event: any) => {
                              setUserData({
                                ...userData,
                                currentPassword: event.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6"></div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="passwordInput" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            autoComplete="new-password"
                            onChange={(event: any) => {
                              setUserData({
                                ...userData,
                                newPassword: event.target.value,
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
                            New Password Again
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordAgainInput"
                            onChange={(event: any) => {
                              setUserData({
                                ...userData,
                                newPasswordAgain: event.target.value,
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
                        className="btn btn-primary w-25"
                        onClick={updateSubmit}
                      >
                        Save
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
