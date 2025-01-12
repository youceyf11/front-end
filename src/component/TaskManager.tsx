{/* import {useEffect, useState} from "react";
import { TaskResponse } from "../types/task-response.ts";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../services/task-service.ts";
import { TaskRequest } from "../types/task-request.ts";
import {CategorieResponse} from "../types/categorie-response.ts";
import {getAllCategories} from "../services/categorie-service.ts";

export default function TaskManager() {
    const [task, setTask] = useState<Partial<TaskResponse>>({
        title: '',
        description: '',
        dateEcheance: '',
        priorite: '',
        statut: '',
        categorieId: ''
    });
    const [categories, setCategories]= useState<CategorieResponse[]>([]);

    function getCategories(){
        getAllCategories().then((response) => {
            setCategories(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }


    useEffect(() => {
        getCategories();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleCreateTask = async () => {
        const { title, description, dateEcheance, priorite, statut, categorieId } = task;

        if (!title || !description || !dateEcheance || !priorite || !statut || !categorieId) {
            console.error('All fields are required');
            return;
        }

        const taskRequest: TaskRequest = { title, description, dateEcheance: dateEcheance, priorite, statut, categorieId };

        try {
            const response = await createTask(taskRequest);
            console.log('Task created:', response);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = (id: string) => {
        updateTask(id, task)
            .then(response => {
                console.log('Task Updated:', response.data);
            })
            .catch(error => {
                console.log('Error updating task:', error);
            });
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id)
            .then(response => {
                console.log('Task deleted:', response.data);
            })
            .catch(error => {
                console.log('Error deleting task:', error);
            });
    };

    const handleGetTasks = () => {
        getAllTasks()
            .then(response => {
                console.log('List of all tasks:', response.data);
            })
            .catch(error => {
                console.log('Error getting all of tasks:', error);
            });
    };

    const handleGetTask = (id: string) => {
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
                type="date"
                name="dateEcheance"
                placeholder="Due Date"
                value={task.dateEcheance || ''}
                onChange={handleInputChange}
            />

            <select name="priorite" value={task.priorite || ''} onChange={handleInputChange}>
                <option value="">Choose a priorite</option>
                <option value="FAIBLE">Faible</option>
                <option value="MOYENNE"> Moyenne</option>
                <option value="HAUTE">Haute</option>
            </select>

            <select name="statut" value={task.statut || ''} onChange={handleInputChange}>
                <option value="">Choose a statut</option>
                <option value="TERMINEE">Terminé</option>
                <option value="EN_ATTENTE">Enattente</option>
            </select>


            <select name="categorieId" value={task.categorieId || ''}
                    onChange={handleInputChange}>
                <option value="">Choose a categorie</option>
                {categories.map((cat : CategorieResponse) => (
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                    ))}

            </select>
            <button onClick={handleCreateTask}>Create.tsx Task</button>
            <button onClick={handleGetTasks}>Get all the tasks</button>
            <button onClick={() => task.id && handleDeleteTask(task.id)}>Delete Task</button>
            <button onClick={() => task.id && handleUpdateTask(task.id)}>Update Task</button>
            <button onClick={() => task.id && handleGetTask(task.id)}>Get a task</button>
        </div>
    );
}

*/}
