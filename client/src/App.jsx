import { useState, useEffect } from 'react'
import Todo from './components/Todo'

function App() {
  
  const [todos, setTodos] = useState([])
  const [formData, setFormData] = useState({
    todo: ''
  })

  const getTodos = async () => {
    try{
      const res = await fetch('http://localhost:3000/api/v1/getTodos')
      const data = await res.json()
      setTodos(data)

    }catch(err){
      console.log(err)
    }
  }

  const deleteTodo = async (id) => {
    try{
      const res = await fetch(`http://localhost:3000/api/v1/deleteTodo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!res.ok){
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      getTodos()
    }catch(err){
      console.log(err)
    }
  }

  const toggleTodo = async (id) => {
    try{
      const res = await fetch(`http://localhost:3000/api/v1/toggleTodo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!res.ok){
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      getTodos()
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to a server or perform some action
      try{
        const res = await fetch('http://localhost:3000/api/v1/newTodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if(!res.ok){
          throw new Error('Network response was not ok')
        }

        const data = await res.json()
        setFormData({
          todo: ''
        })
        getTodos()
      }catch(err){
        console.log(err)
      }
  } 

  useEffect(() => {
    
    getTodos()
},[])


  return (
    <div className='flex flex-col justify-center items-center text-gray-200 w-full'>
      <main className='flex flex-col gap-5'>

      <section className='flex flex-col gap-5 mt-10 px-8 py-5'>
      <h1 className='mt-5 '>Add something Todo :</h1>
      <form className='flex flex-col'>
      <div className='flex gap-3'>

      <input type="text" id="todo" name='todo' value={formData.todo} onChange={handleChange} className="bg-gray-600 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-gray-400" placeholder="e.g Clean the house" required />
      <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
      </div>
      </form>
          </section>
          <section className='p-8'>
            <h2>Todos:</h2>
            {todos.length > 0 ? (
              <ul className="flex flex-col-reverse w-full mt-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {todos.map((item, index) => (
                  <Todo
                    key={item.id}
                    id={item.id}
                    handleDelete={() => deleteTodo(item.id)}
                    handleToggle={() => toggleTodo(item.id)}
                    isLast={index === todos.length - 1}
                    isFirst={index === 0}
                    isComplete={item.isComplete}
                  >
                    {item.todo}
                  </Todo>
                ))}
              </ul>
            ) : null}
          </section>
      </main>
    </div>
  )
}

export default App
