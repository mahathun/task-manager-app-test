import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { fetchTasks } from './api/APITasks'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([])  

  const onClickHandler = async () => {  

    const data = await fetchTasks()
    console.log("data",data)
    setTasks(data)

  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClickHandler}>
      Click me
    </button>
    </>
  )
}

export default App
