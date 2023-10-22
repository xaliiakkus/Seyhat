"use client";
export default function DealsMenu() {
  return (
    <ul className="dropdown-menu me-2">
      <li>
        <a
          className="dropdown-item"
          href="/worldwide-tours#promotion_type=last_minute"
          title="Last Minute Deals"
          onClick={(event) => {
            event.preventDefault();
            location.href = "/worldwide-tours#promotion_type=last_minute";
            if (window.location.pathname == "/worldwide-tours") {
              location.reload();
            }
          }}
        >
          Last Minute Deals
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="/worldwide-tours#promotion_type=discount_week"
          title="Deals of week"
          onClick={(event) => {
            event.preventDefault();
            location.href = "/worldwide-tours#promotion_type=discount_week";
            if (window.location.pathname == "/worldwide-tours") {
              location.reload();
            }
          }}
        >
          Deals of week
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="/worldwide-tours#promotion_type=group"
          title="Group Deals"
          onClick={(event) => {
            event.preventDefault();
            location.href = "/worldwide-tours#promotion_type=group";
            if (window.location.pathname == "/worldwide-tours") {
              location.reload();
            }
          }}
        >
          Group Deals
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href="/worldwide-tours#promotion_type=discount_all"
          title="All Deals"
          onClick={(event) => {
            event.preventDefault();
            location.href = "/worldwide-tours#promotion_type=discount_all";
            if (window.location.pathname == "/worldwide-tours") {
              location.reload();
            }
          }}
        >
          <strong>All Deals</strong>
        </a>
      </li>
    </ul>
  );
}
