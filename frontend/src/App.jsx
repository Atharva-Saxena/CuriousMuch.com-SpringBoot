import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white text-4xl font-bold">
        CuriousMuch.com!
    </div>
    </>
  )
}

export default App
