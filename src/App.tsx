import TodoList from "./components/todoList/TodoList.tsx";
import Modal from "./components/modal/Modal.tsx";
import {useState} from "react";
import {Button} from "@mui/material";

function App() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='app'>
            <div className="container">
                <h1>Todo</h1>
                <Button onClick={() => setIsOpen(true)}
                        variant="outlined">New Task</Button>
                <div className='main'>
                    <TodoList/>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}
        </div>
    )
}

export default App
