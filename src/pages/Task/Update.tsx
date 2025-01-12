import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../../services/task-service.ts";
import { TaskResponse } from "../../types/task-response.ts";
import { Container, Typography, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

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
                    const taskData = response.data;
                    if (Array.isArray(taskData.dateEcheance)) {
                        taskData.dateEcheance = `${taskData.dateEcheance[0]}-${String(taskData.dateEcheance[1]).padStart(2, '0')}-${String(taskData.dateEcheance[2]).padStart(2, '0')}`;
                    }
                    setTask(taskData);
                })
                .catch(error => {
                    console.error('Error fetching the task:', error);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
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
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Task
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Update Task
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/tasks')}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}