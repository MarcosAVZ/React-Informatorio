import { useReducer, useState } from "react";
import style from './prueba.module.css';

type Task = { id: number; text: string; completed: boolean };


function tasksReducer(tasks: Task[], action: { type: string; playload?: string | number }) {
    switch (action.type) {
        case 'add':
            return [
                ...tasks,
                {
                    id: Date.now(),
                    text: typeof action.playload === 'string' ? action.playload : '',
                    completed: false
                }
            ];
        case 'toogle':
            return tasks.map(task => task.id === action.playload ? { ...task, completed: !task.completed } : task);
        case 'remove':
            return tasks.filter(task => task.id !== action.playload);
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

function Prueba() {
    
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [taskText, setTaskText] = useState('');
    
    function handleAddTask() {
        if (taskText.trim()){
            dispatch({ type: 'add', playload: taskText });
            setTaskText('');
        }
    }

    return (
        <div className={style.container}>
            <h1>Lista de Tareas</h1>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Nueva tarea"
            />
            <button onClick={handleAddTask}>Agregar Tarea</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? style.completed : ''}>
                        <span onClick={() => dispatch({ type: 'toogle', playload: task.id })}>
                            {task.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'remove', playload: task.id })}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Prueba;