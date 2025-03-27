import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function FetchGetRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);

  useEffect(() => {
    async function fetchDataPosts() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=8`
        );
        if (!response.ok) {
          throw new Error(`HTTP error:status${response.status}`);
        }
        let postData = await response.json();
        setData(postData);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDataPosts();
  }, []);

  console.log(data);

  return (
    <div className="flex">
      <div className="w-52 sm:w-80 flex justify-center items-center">
        {loading && <div className="text-lg font-medium">Loading posts...</div>}
        {error && <div className="text-red-700">{error}</div>}
        <ul>
          {data &&
            data.map(({ id, title, body }) => (
              <li
                key={id}
                className="border-b border-gray-100 text-sm sm:text-base"
                onClick={() => setSelectedBody(body)}
              >
                <NavLink
                  className={({ isActive }) => {
                    const baseClasses = 'p-4 block hover:bg-gray-100';
                    return isActive
                      ? `${baseClasses} bg-gray-100`
                      : baseClasses;
                  }}
                  to={`/posts/${id}`}
                >
                  {title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-gray-100 flex-1 p-4 min-h-[550px]">
        {selectedBody ? <p>{selectedBody}</p> : 'Single post here...'}
      </div>
    </div>
  );
}

export default FetchGetRequest;
