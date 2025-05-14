import React, { useEffect, useState } from "react";

// Number of posts to show per page
const POSTS_PER_PAGE = 5;

const Pagination = () => {
  // State to store all fetched posts
  const [posts, setPosts] = useState([]);

  // State to track the current page number
  const [page, setPage] = useState(1);

  // State to show loading status while fetching posts
  const [loading, setLoading] = useState(true);

  // Fetch posts from API when component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // Save posts into state
        setLoading(false); // Turn off loading once data is ready
      })
      .catch((error) => {
        console.error("Fetching error:", error);
        setLoading(false); // Stop loading even if error occurs
      });
  }, []);

  // Calculate starting index for current page
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  // Calculate ending index for current page
  const endIndex = startIndex + POSTS_PER_PAGE;

  // Slice the posts array to show only current page's posts
  const currentPostList = posts.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Handle going to the previous page
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  // Handle going to the next page
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-7 bg-gray-100">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
        <h2 className="font-bold text-2xl text-center mb-6">Post List</h2>

        {/* Show loading spinner while fetching data */}
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <>
            {/* Render posts list */}
            <ul className="space-y-4">
              {currentPostList.map((post) => (
                <li key={post.id} className="p-4 border rounded-md shadow">
                  <p className="text-lg font-semibold">{post.title}</p>
                  <p className="text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>

            {/* Pagination controls */}
            <div className="pt-6 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Next
              </button>
              w
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
