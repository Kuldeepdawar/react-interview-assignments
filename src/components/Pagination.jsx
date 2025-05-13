import React, { useEffect, useState } from "react";
// how many post you want to show I want 5
const POSTS_PER_PAGE = 5;
const Pagination = () => {
  // fetch state and store in state
  const [posts, setPost] = useState([]);

  // state for current page
  const [page, setPage] = useState(1);

  // state for loading state
  const [loading, setLoading] = useState(true);

  // fetch data from jsonplaceholder.typicode.com.posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("fetching error", error);
        setLoading(false);
      });
  }, []);

  // determine the post based on current page
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  // 1-1 = 0*5 = 0
  //=2-1 = 1*5 = 5
  // 3-1 = 2*5= 10
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPostIndex = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE); // 100/5 = 20

  // decrease page
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  // handle increase page
  const handleIncreasePage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-7 bg-gray-100">
      <div className="bg-white border-md w-full max-w-2xl ">
        <h2 className="font-bold text-2xl text-center mb-6">Post List</h2>
        {/*SHowing loading state when data is fetched */}

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <>
            {/*display the post */}
            <ul className="space-y-4">
              {currentPostIndex.map((post) => (
                <li key={post.id} className="p-4 border rounded-md shadow-2xl">
                  <p className="text-lg font-semibold">{post.title}</p>
                  <p className="text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>
            <div className="p-6 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className=" text-gray-700 font-medium">
                Page {page} of {totalPages}
              </span>
              <button className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-500">
                Next
              </button>
            </div>
          </>
        )}
      </div>
      Pagination
    </div>
  );
};

export default Pagination;
