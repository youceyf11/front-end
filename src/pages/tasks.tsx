import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {TaskResponse} from "../types/task-response.ts";
import {getAllTasks} from "../services/task-service.ts";
import {Link} from "react-router-dom";


export default function TaskPage(){
    const [tasks, setTasks] =useState<TaskResponse[]>([]);



    function getTasks(){
        getAllTasks().then((response) =>{
            setTasks(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getTasks();
    },[])

    return(
        <>

            <TableContainer component={Paper} className="container mt-4">
                <button>
                    <Link to={"/"} >Go to categorie </Link>
                </button>
                <Table sx={{ minWidth: 600}} aria-label="simple table">
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
                                <TableCell align="right">{task.categorieId}</TableCell>
                                <TableCell align="right">{task.createdAt}</TableCell>
                                <TableCell align="right">{task.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}