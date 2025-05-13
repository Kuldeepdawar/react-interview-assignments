// Import React hooks
import { useState } from "react";

function FlattenArray() {
  // Initial nested array (change as needed)
  const nestedArray = [1, [2, [3, 4]], 5];

  // Function to flatten array recursively without Array.flat()
  const flatten = (arr) => {
    // Initialize an empty result array
    const result = [];

    // Loop through each element in the input array
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];

      // If value is an array, recursively flatten and push elements
      if (Array.isArray(value)) {
        result.push(...flatten(value)); // Spread and push recursive result
      } else {
        result.push(value); // Push non-array values directly
      }
    }

    // Return the flattened result
    return result;
  };

  // Store the result in state (only calculated once)
  const [flatArray] = useState(() => flatten(nestedArray));

  return (
    // Main container styling
    <div className="p-6 max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Flatten Nested Array</h1>

      {/* Show original nested array */}
      <p className="mb-2 text-gray-700">
        <strong>Original:</strong> {JSON.stringify(nestedArray)}
      </p>

      {/* Show flattened array */}
      <p className="text-green-700 font-medium">
        <strong>Flattened:</strong> {JSON.stringify(flatArray)}
      </p>
    </div>
  );
}

export default FlattenArray;
