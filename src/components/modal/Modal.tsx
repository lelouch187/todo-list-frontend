import {createPortal} from "react-dom";
import s from './modal.module.css'
import {SubmitHandler, useForm} from "react-hook-form"
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Status, Todo} from "../../types/todo.ts";
import {useAddTaskMutation} from "../../services/todo.ts";

interface ModalProps {
    setIsOpen: (arg: boolean) => void
}

const Modal = ({setIsOpen}: ModalProps) => {
    const [addTask] = useAddTaskMutation()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Todo>()

    const onSubmit: SubmitHandler<Todo> = (task) => {
        addTask(task)
        setIsOpen(false)
    }

    return createPortal(
        <div className={s.modal}>
            <div className={s.content}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField error={!!errors.title?.type}
                               {...register("title", {required: true})}
                               variant="outlined"
                               placeholder='Enter the title'/>
                    {!!errors.title?.type && <p className='errorText'>Field cannot be empty</p>}
                    <TextField error={!!errors.text?.type}
                               {...register("text", {required: true})}
                               variant="outlined"
                               placeholder='Enter the text'/>
                    {!!errors.text?.type && <p className='errorText'>Field cannot be empty</p>}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">task status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("status")}
                            label='task status'
                            defaultValue={Status.AWAIT_EXECUTION}
                        >
                            <MenuItem value={Status.AWAIT_EXECUTION}>{Status.AWAIT_EXECUTION}</MenuItem>
                            <MenuItem value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</MenuItem>
                            <MenuItem value={Status.DONE}>{Status.DONE}</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained">Add Task</Button>
                </form>
                <div onClick={() => setIsOpen(false)}
                     className={s.close}>&times;</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;