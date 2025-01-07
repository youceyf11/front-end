import { useState } from "react";
import {createCategorie, getAllCategories} from "../../services/categorie-service.ts";
import { CategorieResponse } from "../../types/categorie-response.ts";
import {useNavigate} from "react-router-dom";

export default function CreateCategorie() {
    const [categorie, setCategorie] = useState<Partial<CategorieResponse>>({ name: "" });

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

    const navigate= useNavigate();

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={categorie.name || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">Create Category</button>
            <button type="button" onClick={handleGetCategories}>Go to Category List</button>
        </form>

    );
}