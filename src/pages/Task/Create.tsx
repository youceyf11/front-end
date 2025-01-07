import {useEffect, useState} from "react";
import {TaskResponse} from "../../types/task-response.ts";
import {CategorieResponse} from "../../types/categorie-response.ts";
import {getAllCategories} from "../../services/categorie-service.ts";
import {TaskRequest} from "../../types/task-request.ts";
import {Link, useNavigate} from "react-router-dom";
import { createTask } from '../../services/task-service.ts';

export default function CreateTask() {
    const [task, setTask] = useState<Partial<TaskResponse>>({
        title: '',
        description: '',
        dateEcheance: '',
        priorite: '',
        statut: '',
        categorieId: ''
    });
    const [categories, setCategories] = useState<CategorieResponse[]>([]);
    const navigate= useNavigate();

    function getCategories() {
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
        const {name, value} = e.target;
        setTask(prevTask => ({...prevTask, [name]: value}));
    };

    const handleCreateTask = async () => {
        const {title, description, dateEcheance, priorite, statut, categorieId} = task;

        if (!title || !description || !dateEcheance || !priorite || !statut || !categorieId) {
            console.error('All fields are required');
            return;
        }

        const taskRequest: TaskRequest = {
            title,
            description,
            dateEcheance: dateEcheance,
            priorite,
            statut,
            categorieId
        };

        try {
            const response = await createTask(taskRequest);
            console.log('Task created:', response);
            navigate('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
        }
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
                {categories.map((cat: CategorieResponse) => (
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                ))}

            </select>
            <button onClick={handleCreateTask}>Create Task</button>
            <button>
                <Link to="/tasks">Go to task page</Link>
            </button>

        </div>
    );
}