import { useEffect, useState } from 'react';

export default function Image() {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos', { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Status error');
        }
        return response.json();
      })
      .then((response) => setImgUrl(response[0].url))
      .catch((error) => setError(error));
  }, []);
  console.log(imgUrl);

  if (error) return <p>An error has occured!</p>;

  return (
    imgUrl && (
      <>
        <h1>An Image</h1>
        <img src={imgUrl} alt="Placeholder text" />
      </>
    )
  );
}
