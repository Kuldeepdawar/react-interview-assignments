import React, { useEffect, useState } from "react";

// Set how many posts to show per page
const POSTS_PER_PAGE = 5;

const PaginationApi = () => {
  // State to hold the fetched posts
  const [posts, setPosts] = useState([]);

  // State for the current page number
  const [page, setPage] = useState(1);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => {
        setPosts(data); // Set fetched data into the state
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading if an error occurs
      });
  }, []);

  // Determine the posts to display based on the current page
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Handle prev and next buttons
  const handlePrev = () => {
    if (page > 1) setPage(page - 1); // Decrease page number
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1); // Increase page number
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Post List</h1>

        {/* Show loading state if data is being fetched */}
        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : (
          <>
            {/* Display the posts */}
            <ul className="space-y-4">
              {currentPosts.map((post) => (
                <li key={post.id} className="p-4 border rounded-md shadow-sm">
                  <p className="text-lg font-semibold">{post.title}</p>
                  <p className="text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginationApi;
