// SearchAndPagination.tsx
import React, { useState } from "react";

interface SearchAndPaginationProps {
  items: any[];
  initialItemsPerPage: number;
  onItemSelect: (item: any) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
  renderTableHeader: () => React.ReactNode;
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({
  items,
  initialItemsPerPage,
  onItemSelect,
  renderItem,
  renderTableHeader,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [pageNumberInput, setPageNumberInput] = useState<string>("1");

  // Filter based on search term
  const filteredItems = items.filter((item) => {
    return (
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Paginate the filtered items
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setPageNumberInput((page + 1).toString());
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setPageNumberInput((page - 1).toString());
    }
  };

  const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumberInput(e.target.value);
  };

  const handlePageNumberBlur = () => {
    const pageNumber = parseInt(pageNumberInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      setPageNumberInput(page.toString()); // Reset to current page if invalid
    }
  };

  const handlePageNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageNumberBlur();
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(1); // Reset to first page when items per page changes
  };

  return (
    <div>
      {/* Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">{renderTableHeader()}</tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => onItemSelect(item)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {renderItem(item, (page - 1) * itemsPerPage + index)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="pageIndex">Page Number</label>
          <input
            id="pageIndex"
            className="m-2 w-16 p-2 border border-gray-300 rounded-md text-center"
            value={pageNumberInput}
            onChange={handlePageNumberChange}
            onBlur={handlePageNumberBlur}
            onKeyPress={handlePageNumberKeyPress}
          />
          of {totalPages}
        </div>
        <div className="flex space-x-4">
          {page > 1 && (
            <button
              onClick={handlePrevious}
              className="p-2 bg-yellow-500 text-white rounded-md"
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              onClick={handleNext}
              className="p-2 bg-green-500 text-white rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndPagination;