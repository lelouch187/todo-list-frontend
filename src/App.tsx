import TodoList from "./components/todoList/TodoList.tsx";

function App() {
  return(
      <div className='app'>
        <div className="container">
          <h1>Todo</h1>
            <div className='main'>
                <TodoList />
            </div>
        </div>
      </div>
  )
}

export default App
