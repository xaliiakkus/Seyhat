"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Filter from "@/components/tour-category-page/filter";
import TourList from "@/components/tour-category-page/tour-list";
import getData from "@/services/filterPageService";
import TourListSkeleton from "@/components/tour-category-page/tour-list-skeleton";
import Pagination from "../pagination/pagination";
import Breadcrumb from "../header/breadcrumb";

export default function Page({ term }: { term: any }) {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState({});
  const [totalTours, setTotalTours] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({
    service_types: [],
    accommodations: [],
    guiding: [],
    languages: [],
    term,
  });

  const pagination = async ({ page }: { page: number }) => {
    scroll(0, 0);
    setLoading(true);
    await getData({
      params: {},
      page,
      filterData,
      currency: getCookie("currency"),
    }).then((res) => {
      setTours(res.tours);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getData({
      params: {},
      page: 1,
      filterData,
      currency: getCookie("currency"),
    }).then((res) => {
      setTotalTours(res.total);
      setCurrentPage(1);
      setTours(res.tours);
      setLoading(false);
    });
  }, [filterData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <div className="container-xxl my-4">
        <Breadcrumb
          items={[
            {
              pageTitle: "Search",
              pageUrl: `/search`,
            },
          ]}
        />
        <h1 className="h4">Search results for: &quot;{term}&quot;</h1>
        <div className="row mt-4 justify-content-between">
          <div
            className="col-lg-3 d-lg-block offcanvas-lg offcanvas-start"
            tabIndex={9999}
            id="tourFilterSide"
            aria-labelledby="tourFilterSideLabel"
          >
            <div className="offcanvas-header">
              <span className="offcanvas-title h5">Tour Filters</span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                data-bs-target="#tourFilterSide"
              ></button>
            </div>
            <div className="offcanvas-body d-block p-0">
              <Filter
                filterData={filterData}
                onFilterChange={(filter: any) => {
                  setFilterData(filter);
                }}
              />
            </div>
          </div>
          <div className="col-lg-9 col-sm-12 col-md-12">
            <button
              className="btn btn-primary d-lg-none mb-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#tourFilterSide"
              aria-controls="tourFilterSide"
            >
              Tour Filters
            </button>
            {loading ? <TourListSkeleton /> : <TourList tours={tours} />}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalTours}
                pageSize="10"
                onPageChange={(page: number) => {
                  setCurrentPage(page);
                  pagination({ page });
                }}
              />
            )}
            {totalTours === 0 &&
              !loading &&
              "No suitable tours were found matching your search result. Please try again with another query. "}
          </div>
        </div>
      </div>
    </main>
  );
}
