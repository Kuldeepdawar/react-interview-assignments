// src/components/SearchFilter.jsx

import React, { useState } from "react";

const countriesList = [
  "India",
  "United States",
  "Australia",
  "Germany",
  "Canada",
  "Brazil",
  "Indonesia",
  "France",
  "Finland",
  "Japan",
  "Mexico",
  "Italy",
  "Egypt",
  "Spain",
  "Norway",
];

const SearchFilter = () => {
  // State to hold the current search query
  const [query, setQuery] = useState("");

  // Filtered countries based on the query (case-insensitive match)
  const filteredCountries = countriesList.filter((country) =>
    country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search countries..."
        className="border px-4 py-2 w-full rounded shadow"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as you type
      />

      {/* Result List */}
      <ul className="mt-4">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <li key={index} className="p-2 border-b">
              {country}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No countries found.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
