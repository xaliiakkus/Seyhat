"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/header/breadcrumb";
import Pagination from "../pagination/pagination";
import getAttractions from "@/services/attractionsPageService";
import AttractionsListSkeleton from "./list-skeleton";

export default function Page({ attractionsData }: { attractionsData: any }) {
  const [data, setData] = useState(
    attractionsData.data ? attractionsData.data : []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAttractions, setTotalAttractions] = useState(
    attractionsData.meta.total ? attractionsData.meta.total : 0
  );
  const [loading, setLoading] = useState(false);

  const pagination = async ({ page }: { page: number }) => {
    scroll(0, 0);
    setLoading(true);
    await getAttractions({
      page,
    }).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[{ pageTitle: "Attractions", pageUrl: "/attractions" }]}
        />
        <h1 className="h3">Top Tourist Attractions &amp; Best Things to Do</h1>

        <div className="row mt-3">
          <div
            className="col-12"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            <p>
              The attractions tab organizes the most important information into
              categories to facilitate and shorten all searching, reading and
              exploring processes that might be confusing and time waste.
            </p>
            <p>
              It separates and lists the well-known and unknown destinations
              location-based such as historical ruins, museums, monuments,
              ancient temples, zoos, entertainment facilities, art galleries,
              botanical gardens, indoor and outdoor activities, and else
              smartly.
            </p>
            <p>
              This category will help you gather more precise, current, and
              reliable information about the attractions on your destination, so
              you don&rsquo;t get lost in search bars, pages of search results,
              blogs, or the web... You may quickly discover the attraction that
              you are seeking in this session because it has been classed as a
              list that is grouped under the city names.
            </p>
            <p>
              When you go to that web page, you&rsquo;ll get a concise,
              well-designed piece of pure information with good shots. This will
              assist you while deciding about where you will go, what you will
              see, and why you need to choose it or go?
            </p>
            <p>
              So, while you plan your next amazing trip, this session will help
              you find new places to visit as well as provide suggestions or
              inspiration for new, never thought or hear before destinations.
            </p>
          </div>
        </div>

        {loading && <AttractionsListSkeleton />}
        {!loading && (
          <div className="row">
            {data.map((item: any) => (
              <div className="col-6 col-lg-4 mt-4" key={item.id}>
                <div className="card border-light-subtle h-100">
                  <a
                    href={"/attractions/" + item.slug}
                    target="_blank"
                    title={item.name}
                  >
                    <Image
                      src={item.media[0].thumb}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="img-fluid rounded-top mx-auto card-img-top"
                      loading="lazy"
                      style={{ height: "auto" }}
                      quality={100}
                    />
                  </a>
                  <div className="card-body">
                    <a
                      href={"/attractions/" + item.slug}
                      target="_blank"
                      title={item.name}
                      className="text-decoration-none"
                    >
                      <h6 className="card-title text-center text-dark">
                        {item.name}
                      </h6>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="row mt-4">
            <div className="col-12">
              <Pagination
                currentPage={currentPage}
                totalCount={totalAttractions}
                pageSize="9"
                onPageChange={(page: number) => {
                  setCurrentPage(page);
                  pagination({ page });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
