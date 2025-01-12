import {useEffect, useState} from "react";
import {CategorieResponse} from "../../types/categorie-response.ts";
import {deleteCategorie, getAllCategories} from "../../services/categorie-service.ts";
import { Link} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";

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
                getCategories();
            })
            .catch(error => {
                console.log('Error deleting the categorie:', error);
            });
    };

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                <Typography variant="h4" component="h1">
                    Categories
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/create-category">
                    Create Category
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/tasks" sx={{ ml: 2 }}>
                    Go to Tasks
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="categories table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((cat: CategorieResponse) => (
                            <TableRow key={cat.id}>
                                <TableCell align="right">{cat.id}</TableCell>
                                <TableCell align="right">{cat.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCategorie(cat.id)}>
                                        Delete
                                    </Button>
                                    <Button variant="contained" color="primary" component={Link} to={`/update-categorie/${cat.id}`} sx={{ ml: 2 }}>
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}