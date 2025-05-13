import React, { useState } from "react";

const data = ["a", "b", "c"];

const PracForm = () => {
  const [query, setQuery] = useState("");

  const FilterData = data.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="search value"
        onChange={(e) => setQuery(e.target.value)}
        className="border rounder w-full px-3 py-2 "
      />

      {/*show result */}
      <ul>
        {FilterData.length > 0 ? (
          FilterData.map((c, index) => <li key={index}>{c}</li>)
        ) : (
          <li className="bg-gray-700">No adata</li>
        )}
      </ul>
    </div>
  );
};

export default PracForm;
