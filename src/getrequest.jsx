import React, { useEffect, useState } from 'react';

function FetchGetRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

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
  return (
    <div className="flex">
      <div className="flex"></div>
    </div>
  );
}

export default FetchGetRequest;
