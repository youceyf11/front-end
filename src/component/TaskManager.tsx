import {useState} from "react";
import {TaskResponse} from "../types/task-response.ts";
import {createTask, deleteTask, getAllTasks, getTask, updateTask} from "../services/task-service.ts";


export default function TaskManager(){
    const [task, setTask] = useState<Partial<TaskResponse>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleCreateTask = () => {
        createTask(task)
            .then(response => {
                console.log('task created:', response.data);
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    };

    const handleUpdateTask= (id: string) => {
        updateTask(id, task)
            .then(response => {
                console.log('Task Updated:', response.data);
            })
            .catch(error => {
                console.log('Error updating task:', error);
            });
    };

    const handleDeleteTask=(id:string) => {
        deleteTask(id)
            .then(response => {
                console.log('Task deleted:', response.data);
            })
            .catch(error => {
                console.log('Error deleting task:', error);
            });
    };

    const handleGetTasks=()=>{
        getAllTasks()
            .then(response => {
                console.log('List of all tasks:', response.data);
            })
            .catch(error => {
                console.log('Error getting all of tasks:',error);
            });
    };

    const handleGetTask=(id:string) =>{
        getTask(id)
            .then(response => {
                console.log('Task you want is:', response.data);
            })
            .catch(error => {
                console.log('Error getting your task:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={task.title || ''}
                onChange={handleInputChange}
            />

            <input
                type="text"
                name="description"
                placeholder="Task Description"
                value={task.description || ''}
                onChange={handleInputChange}
            />

            <input
                type="text"
                name="dateEcheance"
                placeholder="Due Date"
                value={task.dateEcheance}
                onChange={handleInputChange}
            />

            <input
                type="text"
                name="priorite"
                placeholder="Priority"
                value={task.priorite || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="statut"
                placeholder="Status"
                value={task.statut || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="categorieId"
                placeholder="Category ID"
                value={task.categorieId || ''}
                onChange={handleInputChange}
            />

            <button onClick={handleCreateTask}> Create Task</button>
            <button onClick={handleGetTasks}>Get all the tasks</button>
            <button onClick={() => task.id && handleDeleteTask(task.id)}>Delete Task</button>
            <button onClick={() => task.id && handleUpdateTask(task.id)}>Update Task</button>
            <button onClick={() => task.id && handleGetTask(task.id)}>Get a task</button>
        </div>
    )


}