import {Status, Todo} from "../../types/todo.ts";
import s from './task.module.css'
import {useDeleteTaskMutation, useUpdateTaskMutation} from "../../services/todo.ts";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import SaveIcon from '@mui/icons-material/Save';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

interface TaskProps {
    todo: Todo
    index: number
}

const Task = ({todo, index}: TaskProps) => {
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const [isChange, setIsChange] = useState(false)


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Todo>()

    const onSubmit: SubmitHandler<Todo> = async (task) => {
        await updateTask({_id: todo._id, ...task})
        setIsChange(false)
    }

    return (
        <div className={todo.status === Status.DONE ? `${s.task} ${s.done}` : `${s.task}`}>
            {!isChange
                ?
                <>
                    <div>
                        <h2 className={s.title}>{index + 1} {todo.title}</h2>
                        <p className={s.text}>{todo.text}</p>
                    </div>
                    <div className={s.wrapper}>
                <span
                    className={todo.status === Status.DONE ? `${s.status} ${s.done}` : todo.status === Status.IN_PROGRESS ? `${s.status} ${s.progress}` : `${s.status} ${s.await}`}>{todo.status}</span>
                        <DeleteIcon onClick={() => deleteTask({id: todo._id!})}/>
                        <div onClick={() => setIsChange(true)}><ModeIcon/></div>
                    </div>
                </>
                :
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField
                            error={!!errors.title?.type}
                            {...register("title", {required: true})}
                            defaultValue={todo.title}
                            variant="outlined"
                            placeholder='Enter the title'/>
                        {!!errors.title?.type && <p className='errorText'>Field cannot be empty</p>}
                        <TextField error={!!errors.text?.type}
                                   defaultValue={todo.text}
                                   {...register("text", {required: true})}
                                   variant="outlined"
                                   placeholder='Enter the text'/>
                        {!!errors.text?.type && <p className='errorText'>Field cannot be empty</p>}
                    </div>
                    <FormControl fullWidth>
                        <InputLabel style={{color: "white"}} id="demo-simple-select-label">task status</InputLabel>
                        <Select style={{color: "white"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...register("status")}
                                label='task status'
                                defaultValue={todo.status}
                        >
                            <MenuItem value={Status.AWAIT_EXECUTION}>{Status.AWAIT_EXECUTION}</MenuItem>
                            <MenuItem value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</MenuItem>
                            <MenuItem value={Status.DONE}>{Status.DONE}</MenuItem>
                        </Select>
                    </FormControl>

                    <button type="submit"><SaveIcon/></button>
                </form>
            }
        </div>
    );
};

export default Task;