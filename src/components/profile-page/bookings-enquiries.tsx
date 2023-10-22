"use client";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import getUserDetail from "@/services/auth/userDetail";
import Breadcrumb from "@/components/header/breadcrumb";

export default function Page() {
  const [user, setUser] = useState({ email: "", name: "" });
  const [userLoading, setUserLoading] = useState(true);
  const fetchUserDetail = async () => {
    const userData = await getUserDetail({ token: getCookie("auth-token") });
    return userData;
  };

  useEffect(() => {
    if (hasCookie("auth-token")) {
      try {
        fetchUserDetail().then((res: any) => {
          setUser({ email: res.email, name: res.name });
          setUserLoading(false);
        });
      } catch (e) {
        // setUser({ email: "", name: "" });
      }
    } else {
      setUserLoading(false);
    }
  }, []);

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb items={[{ pageTitle: "Profile", pageUrl: "/profile" }]} />
        <h1 className="h3">Enquiries &amp; Bookings</h1>

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
                      className="nav-item list-group-item list-group-item-action px-3 rounded-0"
                    >
                      Profile
                    </a>
                    <a
                      href="/profile/bookings-enquiries"
                      className="nav-item list-group-item list-group-item-action px-3 active"
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
                  <p>
                    <strong>{user.name}</strong>
                    <br />
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
