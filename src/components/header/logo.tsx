"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  if (pathname == "/") {
    return (
      <h1 className="m-0 p-0" style={{ fontSize: "initial !important" }}>
        <a className="navbar-brand p-0" href="/" title="TravelShop Booking">
          <Image
            src="/images/header/logo/logo.svg"
            alt="TravelShop Booking"
            width={175}
            height={60}
            quality={100}
          />
        </a>
      </h1>
    );
  } else {
    return (
      <a className="navbar-brand p-0" href="/" title="TravelShop Booking">
        <Image
          src="/images/header/logo/logo.svg"
          alt="TravelShop Booking"
          width={175}
          height={60}
          quality={100}
        />
      </a>
    );
  }
}
