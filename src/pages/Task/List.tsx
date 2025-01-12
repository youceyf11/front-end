import {useEffect, useState} from "react";
import {TaskResponse} from "../../types/task-response.ts";
import {deleteTask, getAllTasks} from "../../services/task-service.ts";
import {getAllCategories} from "../../services/categorie-service.ts";
import {CategorieResponse} from "../../types/categorie-response.ts";
import {
    Box, Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

export default function TaskPage() {
    const [tasks, setTasks]= useState<TaskResponse[]>([]);
    const [categories, setCategories]= useState<CategorieResponse[]>([]);

    useEffect(() => {
        getTasks();
        getCategories();
    }, []);

    const getTasks = () =>{
        getAllTasks().then((response) => {
            setTasks(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const getCategories= () => {
        getAllCategories().then((response) => {
            setCategories(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const getCategorieName=(id:string) => {
        const categorie = categories.find(cat => cat.id === id);
        return categorie ? categorie.name : "unknown ";
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id)
            .then(response => {
                console.log('Task deleted:', response.data);
                getTasks();
            })
            .catch(error => {
                console.log('Error deleting task:', error);
            });
    };


    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1} >
                <Typography variant="h4" component="h1">Tasks</Typography>


                <Button variant="contained" color="primary" component={Link} to={"/create-task"}>
                    Create Task
                </Button>
                <Button variant="contained" color="primary" component={Link} to={"/categorie-list"}>
                    Go to Categories
                </Button>
            </Box>
                <TableContainer component={Paper}>

                <Table sx={{ minWidth: 600}} aria-label="tasks table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Date Echeance</TableCell>
                            <TableCell align="right">Priorite</TableCell>
                            <TableCell align="right">Statut</TableCell>
                            <TableCell align="right">Categorie</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task: TaskResponse) => (
                            <TableRow key={task.id}>
                                <TableCell align="right">{task.id}</TableCell>
                                <TableCell align="right">{task.title}</TableCell>
                                <TableCell align="right">{task.description}</TableCell>
                                <TableCell align="right">{task.dateEcheance}</TableCell>
                                <TableCell align="right">{task.priorite}</TableCell>
                                <TableCell align="right">{task.statut}</TableCell>
                                <TableCell align="right">{getCategorieName(task.categorieId)}</TableCell>
                                <TableCell align="right">{task.createdAt}</TableCell>
                                <TableCell align="right">{task.updatedAt}</TableCell>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                <button>
                                    <Link to={"/update-task/" + task.id}>Update</Link>
                                </button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </Container>
    )


}