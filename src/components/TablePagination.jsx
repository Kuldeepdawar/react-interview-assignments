import React, { useState } from "react";

// Sample user data – 20 items
const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of users per page

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calculate start and end index for slicing user array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get current page's users
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Go to specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Paginated User Table
      </h1>

      {/* Table UI */}
      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Previous Button – Disabled if on first page */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-4 py-2 border rounded ${
              currentPage === pageNum
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button – Disabled if on last page */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedTable;
