import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://18.175.131.44:8000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>FastAPI + React</h1>
      <h1>{message}</h1>
    </>
  )
}

export default App
