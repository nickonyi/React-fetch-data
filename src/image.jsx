import { useEffect, useState } from 'react';

function useImageUrl() {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos', {
      mode: 'cors',
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Status error');
        }
        return response.json();
      })
      .then((response) =>
        setImgUrl(
          response[0]?.url.replace('via.placeholder.com', 'dummyimage.com')
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { imgUrl, loading, error };
}

export default function Image() {
  const { imgUrl, error, loading } = useImageUrl();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A Network error has occured!</p>;

  return (
    imgUrl && (
      <>
        <h1>An Image</h1>
        <img src={imgUrl} alt="Placeholder text" />
      </>
    )
  );
}
