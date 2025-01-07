import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategorie, updateCategorie } from "../../services/categorie-service.ts";
import { CategorieResponse } from "../../types/categorie-response.ts";

export default function UpdateCategorie() {
    const {id} = useParams<{ id: string }>();
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
            <button type="submit">Update Category</button>
        </form>
    );
}