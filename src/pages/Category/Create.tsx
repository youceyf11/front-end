import { useState } from "react";
import {createCategorie, getAllCategories} from "../../services/categorie-service.ts";
import { CategorieResponse } from "../../types/categorie-response.ts";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

export default function CreateCategorie() {
    const [categorie, setCategorie] = useState<Partial<CategorieResponse>>({ name: "" });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategorie(prevCategorie => ({ ...prevCategorie, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCategorie(categorie)
            .then(response => {
                console.log('The category is created:', response.data);
                // Optionally, reset the form or redirect the user
                setCategorie({ name: "" });
            })
            .catch(error => {
                console.error('Error creating the category:', error);
            });
    };

    const handleGetCategories= () => {
        getAllCategories()
            .then(response => {
                console.log('List of all categories:',response.data);
                navigate('/categorie-list');
            })
            .catch(error => {
                console.log('Error getting the tasks:',error);
            });
    };


    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Category
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        id="name"
                        name="name"
                        value={categorie.name || ''}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Category
                        </Button>
                        <Button type="button" variant="outlined" color="secondary" onClick={handleGetCategories}>
                            Go to Category List
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}