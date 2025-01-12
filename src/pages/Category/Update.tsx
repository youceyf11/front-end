import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategorie, updateCategorie } from "../../services/categorie-service.ts";
import { CategorieResponse } from "../../types/categorie-response.ts";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

export default function UpdateCategorie() {
    const { id } = useParams<{ id: string }>();
    const [categorie, setCategorie] = useState<Partial<CategorieResponse>>({ name: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getCategorie(id)
                .then(response => {
                    setCategorie(response.data);
                })
                .catch(error => {
                    console.error('Error fetching the category:', error);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategorie(prevCategorie => ({ ...prevCategorie, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            updateCategorie(id, categorie)
                .then(response => {
                    console.log('The category is updated:', response.data);
                    navigate('/categorie-list');
                })
                .catch(error => {
                    console.error('Error updating the category:', error);
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Category
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
                            Update Category
                        </Button>
                        <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/categorie-list')}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}