import { useState, useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { getTask, updateTask } from "../../services/task-service.ts";
import { TaskResponse } from "../../types/task-response.ts";

export default function UpdateTask() {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Partial<TaskResponse>>({
        title: "",
        description: "",
        dateEcheance: "",
        priorite: "",
        statut: "",
        categorieId: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getTask(id)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => {
                    console.error('Error fetching the task:', error);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            updateTask(id, task)
                .then(response => {
                    console.log('The task is updated:', response.data);
                    navigate('/task-list');
                })
                .catch(error => {
                    console.error('Error updating the task:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Task Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={task.title || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={task.description || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="dateEcheance">dateEcheance:</label>
                <input
                    type="date"
                    id="dateEcheance"
                    name="dateEcheance"
                    value={task.dateEcheance || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="priorite">Priorite:</label>
                <select
                    id="priorite"
                    name="priorite"
                    value={task.priorite || ''}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select priorite</option>
                    <option value="faible">FAIBLE</option>
                    <option value="moyenne">MOYENNE</option>
                    <option value="haute">HAUTE</option>
                </select>
            </div>
            <div>
                <label htmlFor="statut">Statut:</label>
                <select
                    id="statut"
                    name="statut"
                    value={task.statut || ''}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="terminee">TERMINEE</option>
                    <option value="en-attente">EN_ATTENTE</option>
                </select>
            </div>
            <button type="submit">Update Task</button>
            <button>
                <Link to="/tasks">Go to tasks</Link>
            </button>
        </form>
    );
}