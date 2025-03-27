import React, { useEffect, useState } from 'react';

function FetchGetRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDataPosts() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.coms/posts?_limit=8`
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
      </div>
    </div>
  );
}

export default FetchGetRequest;
