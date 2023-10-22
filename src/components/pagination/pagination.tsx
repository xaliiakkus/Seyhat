import { usePagination } from "./use-pagination";

export default function Pagination({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}: {
  onPageChange: any;
  totalCount: any;
  currentPage: any;
  pageSize: any;
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li
          style={{ cursor: currentPage !== 1 ? "pointer" : "" }}
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        >
          <button type="button" className="page-link" onClick={onPrevious}>
            &#60;
          </button>
        </li>
        {paginationRange.map((pageNumber: any) => {
          if (pageNumber === "left-dots" || pageNumber === "right-dots") {
            return (
              <li
                className="page-item"
                style={{ cursor: "pointer" }}
                key={pageNumber}
              >
                <button type="button" className="page-link">
                  &#8230;
                </button>
              </li>
            );
          }

          return (
            <li
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              key={pageNumber}
            >
              <button
                className="page-link"
                type="button"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li
          style={{ cursor: currentPage !== lastPage ? "pointer" : "" }}
          className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
        >
          <button type="button" className="page-link" onClick={onNext}>
            &#62;
          </button>
        </li>
      </ul>
    </nav>
  );
}
