import { useEffect, useState } from "react";
import { TaskResponse } from "../../types/task-response.ts";
import { CategorieResponse } from "../../types/categorie-response.ts";
import { getAllCategories } from "../../services/categorie-service.ts";
import { TaskRequest } from "../../types/task-request.ts";
import { Link, useNavigate } from "react-router-dom";
import { createTask } from '../../services/task-service.ts';
import { Container, Typography, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

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
    const navigate = useNavigate();

    function getCategories() {
        getAllCategories().then((response) => {
            setCategories(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleCreateTask = async () => {
        const { title, description, dateEcheance, priorite, statut, categorieId } = task;

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
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Task
                </Typography>
                <Box component="form" sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Task Title"
                        id="title"
                        name="title"
                        value={task.title || ''}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Task Description"
                        id="description"
                        name="description"
                        value={task.description || ''}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Due Date"
                        id="dateEcheance"
                        name="dateEcheance"
                        value={task.dateEcheance || ''}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priorite-label">Priority</InputLabel>
                        <Select
                            labelId="priorite-label"
                            id="priorite"
                            name="priorite"
                            value={task.priorite || ''}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value="FAIBLE">Low</MenuItem>
                            <MenuItem value="MOYENNE">Medium</MenuItem>
                            <MenuItem value="HAUTE">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="statut-label">Status</InputLabel>
                        <Select
                            labelId="statut-label"
                            id="statut"
                            name="statut"
                            value={task.statut || ''}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value="TERMINEE">Completed</MenuItem>
                            <MenuItem value="EN_ATTENTE">Pending</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="categorieId-label">Category</InputLabel>
                        <Select
                            labelId="categorieId-label"
                            id="categorieId"
                            name="categorieId"
                            value={task.categorieId || ''}
                            onChange={handleSelectChange}
                            required
                        >
                            {categories.map((cat: CategorieResponse) => (
                                <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleCreateTask}>
                            Create Task
                        </Button>
                        <Button variant="outlined" color="secondary" component={Link} to="/tasks">
                            Go to Task List
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}