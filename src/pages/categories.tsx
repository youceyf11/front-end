import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { getAllCategories } from "../services/categorie-service";
import {CategorieResponse} from "../types/categorie-response.ts";
import {Link} from "react-router-dom";


export default function CategoriePage(){
    const [categories, setCategories] = useState<CategorieResponse[]>([]);


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
    },[])

    return(
        <>
            <TableContainer component={Paper} className="container mt-4">
                <button>
                    <Link to={"/task"}>Go to tasks </Link>
                </button>
                <Table sx={{minWidth: 600}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((cat: CategorieResponse) => (
                            <TableRow key={cat.id}>
                                <TableCell align="right">{cat.id}</TableCell>
                                <TableCell align="right">{cat.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}