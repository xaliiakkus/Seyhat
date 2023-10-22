import Info from "./info";
import styles from "./header.module.scss";
import DealsMenu from "./deals-menu";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="shadow-sm bg-white">
      <header className="navbar navbar-expand-md" aria-label="Navbar">
        <div className="container-xxl">
          <Logo />
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              className="bi bi-person-gear"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </button>
          <div
            className="collapse navbar-collapse placeholder-glow"
            id="navbarMenu"
          >
            <form method="GET" action="/search" className="mx-auto">
              <div className={`input-group ${styles.searchbar}`}>
                <input
                  type="text"
                  className="form-control border-primary"
                  name="term"
                  placeholder="Search for tours, destinations and activities"
                  aria-label="Search for tours, destinations and activities"
                  aria-describedby="button-addon2"
                  autoComplete="off"
                  required
                />
                <button
                  className="btn border-primary"
                  type="submit"
                  id="button-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="rgba(133, 78, 201, 0.6)"
                      d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
            <Info />
          </div>
        </div>
      </header>
      <nav className="py-2 border-top border-light-subtle navbar navbar-expand-md">
        <div className="container-xxl">
          <button
            className="btn btn-sm navbar-toggler mx-auto border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu2"
            aria-controls="navbarMenu2"
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
            MENU
          </button>
          <div
            className="collapse navbar-collapse placeholder-glow"
            id="navbarMenu2"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link link-dark dropdown-toggle ps-0"
                  href="/europe-tours"
                  title="Europe Tours"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Europe Tours
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/turkey-tours"
                      title="Turkey Tours"
                    >
                      Turkey Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/greece-tours"
                      title="Greece Tours"
                    >
                      Greece Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/albania-tours"
                      title="Albania Tours"
                    >
                      Albania Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/bulgaria-tours"
                      title="Bulgaria Tours"
                    >
                      Bulgaria Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/europe-tours"
                      title="Europe Tours"
                    >
                      <strong>All Europe Tours</strong>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link link-dark dropdown-toggle ps-0"
                  href="/asia-tours"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Asia Tours
                </a>
                <ul className="dropdown-menu me-2">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/nepal-tours"
                      title="Nepal Tours"
                    >
                      Nepal Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/sri-lanka-tours"
                      title="Sri Lanka Tours"
                    >
                      Sri Lanka Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/maldives-tours"
                      title="Maldives Tours"
                    >
                      Maldives Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/vietnam-tours"
                      title="Vietnam Tours"
                    >
                      Vietnam Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/asia-tours"
                      title="Asia Tours"
                    >
                      <strong>All Asia Tours</strong>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link link-dark dropdown-toggle ps-0"
                  href="/north-america-tours"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  America Tours
                </a>
                <ul className="dropdown-menu me-2">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/united-states-tours"
                      title="United States Tours"
                    >
                      United States Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/belize-tours"
                      title="Belize Tours"
                    >
                      Belize Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/peru-tours"
                      title="Peru Tours"
                    >
                      Peru Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/ecuador-tours"
                      title="Ecuador Tours"
                    >
                      Ecuador Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/colombia-tours"
                      title="Colombia Tours"
                    >
                      Colombia Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/bolivia-tours"
                      title="Bolivia Tours"
                    >
                      Bolivia Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/north-america-tours"
                      title="North America Tours"
                    >
                      <strong>All North America Tours</strong>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/south-america-tours"
                      title="South America Tours"
                    >
                      <strong>All South America Tours</strong>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link link-dark dropdown-toggle ps-0"
                  href="/africa-tours"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Africa Tours
                </a>
                <ul className="dropdown-menu me-2">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/tanzania-tours"
                      title="Tanzania Tours"
                    >
                      Tanzania Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/egypt-tours"
                      title="Egypt Tours"
                    >
                      Egypt Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/uganda-tours"
                      title="Uganda Tours"
                    >
                      Uganda Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/kenya-tours"
                      title="Kenya Tours"
                    >
                      Kenya Tours
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/africa-tours"
                      title="Africa Tours"
                    >
                      <strong>All Africa Tours</strong>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link link-dark dropdown-toggle ps-0"
                  href="/deals"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Deals
                </a>
                <DealsMenu />
              </li>
            </ul>
            <ul className="nav">
              <li className="nav-item">
                <a href="/contact-us" className="nav-link link-dark px-0 py-2">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
