import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch("http://18.175.131.44:8000/")
      .then((res) => {
        console.log('Raw response:', res);
        return res.json();
      })
      .then((data) => {
        console.log('Parsed data:', data);
        setMessage(data.message);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setMessage("Failed to connect");
      });
  }, []); // ✅ this was broken

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
