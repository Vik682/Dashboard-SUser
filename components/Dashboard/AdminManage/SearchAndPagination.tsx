// SearchAndPagination.tsx
import React, { useState } from 'react';

interface SearchAndPaginationProps {
  items: any[];
  itemsPerPage: number;
  onItemSelect: (item: any) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
  renderTableHeader: () => React.ReactNode;
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({
  items,
  itemsPerPage,
  onItemSelect,
  renderItem,
  renderTableHeader,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Filter based on search term
  const filteredItems = items.filter((item) => {
    return (
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Paginate the filtered items
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
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
        <p className="mr-4">
          Showing {paginatedItems.length} of {filteredItems.length} items
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            className="p-2 bg-yellow-500 text-white rounded-md"
            disabled={page <= 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-green-500 text-white rounded-md"
            disabled={paginatedItems.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndPagination;