"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import Breadcrumb from "@/components/header/breadcrumb";
import getIdentityVerification from "@/services/auth/identityVerificationService";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logInSubmit = async () => {
    if (email && password) {
      setErrorMessage("");
      setLoading(true);

      try {
        setLoading(true);

        const res = await getIdentityVerification({ email, password });

        if (res.token) {
          setCookie("auth-token", res.token, { maxAge: 60 * 60 * 24 * 365 });
          location.href = callbackUrl;
        } else {
          setErrorMessage("Invalid email or password.");
        }
      } catch (error: any) {
        setLoading(false);
        setErrorMessage("Invalid email or password.");
      }
    } else setErrorMessage("Please enter your access information.");
  };

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Authentication", pageUrl: "/auth/log-in" }]}
        />
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <div className="card border-light-subtle">
              <div className="card-body p-4">
                <h3>Sign in</h3>
                <p>Please enter your access information.</p>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailInput"
                    onChange={(event: any) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">
                    Password{" "}
                    <small>
                      (
                      <a href="" className="text-decoration-none">
                        Forgot password?
                      </a>
                      )
                    </small>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    onChange={(event: any) => {
                      setPassword(event.target.value);
                    }}
                  />
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
                    onClick={logInSubmit}
                  >
                    Log in
                  </button>
                )}

                <p className="text-center pt-4">
                  Don&#39;t have an account?{" "}
                  <a href="/auth/sign-up" className="text-decoration-none">
                    Sign up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
