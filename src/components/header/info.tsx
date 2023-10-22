"use client";
import getUserDetail from "@/services/auth/userDetail";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Info() {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(
    hasCookie("currency") ? getCookie("currency") : "EUR"
  );

  const changeCurrency = (currency: string) => {
    setCookie("currency", currency, { maxAge: 60 * 60 * 24 * 365 });
    setCurrency(currency);
    location.reload();
  };

  const authLogOut = () => {
    setLoading(true);
    deleteCookie("auth-token");
    setSession(false);
    setUser({ email: "", name: "" });
    location.reload();
  };

  const fetchUserDetail = async () => {
    const userData = await getUserDetail({ token: getCookie("auth-token") });
    return userData;
  };

  useEffect(() => {
    if (hasCookie("auth-token")) {
      try {
        fetchUserDetail().then((res: any) => {
          setSession(true);
          setUser({ email: res.email, name: res.name });
          setLoading(false);
        });
      } catch (e) {
        deleteCookie("auth-token");
        setSession(false);
        setUser({ email: "", name: "" });
      }
    } else {
      setLoading(false);
    }

    if (!hasCookie("currency")) {
      setCookie("currency", "EUR", { maxAge: 60 * 60 * 24 * 365 });
    }
  }, []);

  if (loading)
    return (
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <span className="placeholder placeholder-sm col-12">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </li>
      </ul>
    );

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link link-dark dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {currency}
        </a>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              onClick={() => changeCurrency("EUR")}
              className="dropdown-item"
            >
              <strong>€</strong> - EUR
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => changeCurrency("USD")}
              className="dropdown-item"
            >
              <strong>$</strong> - USD
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => changeCurrency("TRY")}
              className="dropdown-item"
            >
              <strong>₺</strong> - TRY
            </button>
          </li>
        </ul>
      </li>
      {session ? (
        <li className="nav-item dropdown">
          <a
            className="nav-link link-dark dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user.name ?? user.email}
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/profile/bookings-enquiries">
                Enquiries &amp; Bookings
              </a>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item pe-auto"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  authLogOut();
                }}
              >
                Log out
              </button>
            </li>
          </ul>
        </li>
      ) : (
        <li className="nav-item dropdown">
          <a
            className="nav-link link-dark dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            My Account
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/auth/log-in">
                Log in
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/auth/sign-up">
                Sign up
              </a>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
}
