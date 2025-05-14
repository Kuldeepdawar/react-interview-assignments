import React, { useEffect, useState } from "react";

// Sample API that supports query parameters (you can swap with your API)
const API_URL = "https://jsonplaceholder.typicode.com/users"; // Example: Replace with your own backend

function SearchFilterTable() {
  // State to hold fetched user data
  const [users, setUsers] = useState([]);

  // State to hold loading status
  const [loading, setLoading] = useState(false);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from API with query filter
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true while fetching

    try {
      // Add query parameter for filtering if search term is not empty
      const url = searchTerm ? `${API_URL}?name_like=${searchTerm}` : API_URL;

      const response = await fetch(url);
      const data = await response.json();

      setUsers(data); // Update state with filtered data
    } catch (error) {
      console.error("Failed to fetch users", error);
    }

    setLoading(false); // Turn off loading indicator
  };

  // Fetch data initially and whenever searchTerm changes
  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        User Search Filter
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on user input
          placeholder="Search by name..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Table of Users */}
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td className="py-2 px-4 border">{user.id}</td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default SearchFilterTable;
