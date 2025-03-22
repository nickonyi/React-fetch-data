import { useEffect, useState } from 'react';

export default function Image() {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos', { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => setImgUrl(response[0].url))
      .catch((error) => console.error(error));
  }, []);
  console.log(imgUrl);

  return (
    imgUrl && (
      <>
        <h1>An Image</h1>
        <img src={imgUrl} alt="Placeholder text" />
      </>
    )
  );
}
