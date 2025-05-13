// src/components/DebouncedSearch.jsx
import React, { useState, useEffect } from "react";

// Debounced Search component
const DebouncedSearch = () => {
  // State to hold the search query
  const [query, setQuery] = useState("");
  // State to hold the fetched results
  const [results, setResults] = useState([]);
  // State to show loading state
  const [loading, setLoading] = useState(false);

  // Debouncing logic using setTimeout and clearTimeout
  useEffect(() => {
    // Only run if query is not empty
    if (query === "") {
      setResults([]);
      return;
    }

    // Create a timeout to call the API after 300ms of no typing
    const timer = setTimeout(async () => {
      setLoading(true); // Show loading state
      try {
        // Fetch users from GitHub API
        const res = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        const data = await res.json();
        setResults(data.items); // Set the fetched users into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Hide loading state
    }, 2200); // Wait for 300ms after typing

    // Cleanup function to clear the timeout if query changes before 300ms
    return () => clearTimeout(timer);
  }, [query]); // Re-run useEffect when `query` changes

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search GitHub users..."
        className="border px-4 py-2 w-full rounded shadow"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as you type
      />

      {/* Loading Spinner */}
      {loading && <div className="mt-2 text-center">Loading...</div>}

      {/* Display Search Results */}
      <ul className="mt-4">
        {results.length > 0 ? (
          results.map((user) => (
            <li key={user.id} className="p-2 border-b">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
