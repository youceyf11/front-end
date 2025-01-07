import {useEffect, useState} from "react";
import {CategorieResponse} from "../../types/categorie-response.ts";
import {deleteCategorie, getAllCategories} from "../../services/categorie-service.ts";
import { Link} from "react-router-dom";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function ListCategorie(){
    const [categories, setCategories] = useState<CategorieResponse[]>([]);


    const getCategories=() => {
        getAllCategories().then((response) => {
            setCategories(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(( )=> {
        getCategories();
    },[])

    const handleDeleteCategorie=(id:string) => {
        deleteCategorie(id)
            .then(response => {
                console.log('The categorie is deleted:', response.data);
            })
            .catch(error => {
                console.log('Error deleting the categorie:', error);
            });
    };


    return(
        <>
                <TableContainer component={Paper} className="container mt-4">
                    <button>
                        <Link to={"/tasks"}>Go to tasks</Link>
                    </button>
                    <button>
                        <Link to={"/create-category"}>Create a category</Link>
                    </button>
                    <button>
                        <Link to={"/update-categorie"}>Update a category</Link>
                    </button>
                    <Table sx={{minWidth:600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                               <TableCell align="right">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(((cat : CategorieResponse) =>(
                                    <TableRow key={cat.id}>
                                        <TableCell align="right">{cat.id}</TableCell>
                                        <TableCell align="right">{cat.name}</TableCell>
                                        <button onClick={() => handleDeleteCategorie(cat.id)}>Delete</button>

                                    </TableRow>
                                )

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

        </>
    )

}