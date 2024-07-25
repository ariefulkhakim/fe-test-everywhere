interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
      }

      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxDisplayedPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-3 py-2 leading-tight border bg-white text-slate-800"
          >
            &laquo;
          </button>
        </li>
        {renderPageNumbers().map((page, index) => (
          <li key={index}>
            <button
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`px-3 py-2 leading-tight border ${
                currentPage === page
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800"
              }`}
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3 py-2 leading-tight border bg-white text-slate-800"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
