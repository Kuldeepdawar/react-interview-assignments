// src/components/SearchFilter.jsx

import React, { useEffect, useState } from "react";

const SearchFilterApi = () => {
  // State to store all countries from API
  const [countries, setCountries] = useState([]);

  // State to store the search query entered by user
  const [query, setQuery] = useState("");

  // Fetch data from fake API (REST Countries)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        // We map only country names for simplicity
        const countryNames = data.map((country) => country.name.common);

        // Sort alphabetically for better UX
        setCountries(countryNames.sort());
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries(); // Call the API fetch function
  }, []);

  // Filter the country list based on user input (case-insensitive)
  const filteredCountries = countries.filter((country) =>
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
        onChange={(e) => setQuery(e.target.value)} // Update query in real time
      />

      {/* Filtered List */}
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

export default SearchFilterApi;
