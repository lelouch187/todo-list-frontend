import {Todo} from "../../types/todo.ts";
import s from './task.module.css'

interface TaskProps {
    todo:Todo
}
const Task = ({todo}:TaskProps) => {
    return (
        <div className={s.todo}>
            {todo.title}
        </div>
    );
};

export default Task;