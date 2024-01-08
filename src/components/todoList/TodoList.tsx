import {useGetAllTodosQuery} from "../../services/todo.ts";
import Task from "../todo/Task.tsx";

const TodoList = () => {
    const { data:todos, error, isLoading, isFetching } = useGetAllTodosQuery('')

    if (error) {
        return <div>Что-то пошло не так: </div>
    }
    if (!isLoading && todos?.length === 0) {
        return <div>Список Todo пуст</div>
    }

    if (isLoading || isFetching) {
        return <div>Загрузка...</div>
    }


    return (
        <div>
            {todos && todos.map((todo, i)=>{
               return <Task key={todo._id} todo={todo} index={i} />
            })}
        </div>
    );
};

export default TodoList;