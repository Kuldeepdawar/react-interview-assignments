import { useEffect, useState } from "react";

// Custom hook to fetch users from an API
const useFetchUsers = () => {
  // Local state to store fetched users
  const [users, setUsers] = useState([]);
  // Loading state to manage loading spinner or logic
  const [loading, setLoading] = useState(true);
  // Error state to handle API errors
  const [error, setError] = useState(null);

  // useEffect runs once when the component using this hook mounts
  useEffect(() => {
    // Define async function to fetch users
    const fetchUsers = async () => {
      try {
        // Start loading
        setLoading(true);

        // Fetch data from JSONPlaceholder API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        // Throw error if request fails
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        // Parse JSON response
        const data = await response.json();

        // Set users to state
        setUsers(data);
      } catch (err) {
        // Capture and set error
        setError(err.message);
      } finally {
        // Always stop loading when done
        setLoading(false);
      }
    };

    // Call fetch function
    fetchUsers();
  }, []); // Empty dependency array means it only runs once

  // Return data and states so they can be used in components
  return { users, loading, error };
};

export default useFetchUsers;
