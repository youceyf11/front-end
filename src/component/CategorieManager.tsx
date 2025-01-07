import {useState} from "react";
import {CategorieResponse} from "../types/categorie-response.ts";
import {
    createCategorie,
    deleteCategorie,
    getAllCategories,
    getCategorie,
    updateCategorie
} from "../services/categorie-service.ts";

export default function CategorieManager(){
    const [categorie , setCategorie]= useState<Partial<CategorieResponse>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategorie(prevCategorie => ({ ...prevCategorie, [name]: value }));
    };

    const handleGetCategories= () => {
        getAllCategories()
            .then(response => {
                console.log('List of all categories:',response.data);
            })
            .catch(error => {
                console.log('Error getting the tasks:',error);
            });
    };

    const handleGetCategorie=(id:string) => {
        getCategorie(id)
            .then(response => {
                console.log('The categorie you searching is :', response.data);
            })
            .catch(error => {
                console.log('error getting the categorie you searching:', error);
            });
    };

    const handleUpdateCategorie=(id:string) => {
        updateCategorie(id,categorie)
            .then(response => {
                console.log('The categorie is updated:', response.data);
            })
            .catch(error => {
                console.log('Error updating categorie:',error);
            });
    };

    const handleDeleteCategorie=(id:string) => {
        deleteCategorie(id)
            .then(response => {
                console.log('The categorie is deleted:', response.data);
            })
            .catch(error => {
                console.log('Error deleting the categorie:', error);
            });
    };

    const handleCreateCategorie=() => {
        createCategorie(categorie)
            .then(response => {
                console.log('The categorie is created:',response.data);
            })
            .catch(error => {
                console.log('Error creating the categorie:',error);
            });
    };

    return (

        <div>
            <input
                type="text"
                name="name"
                placeholder="Categorie Name"
                value={categorie.name || ''}
                onChange={handleInputChange}
            />

                <button onClick={(handleCreateCategorie)}>Create Categorie</button>
                <button onClick={(handleGetCategories)}>Get all categories</button>
                <button onClick={() => categorie.id && handleDeleteCategorie(categorie.id)}>Delete a Categorie</button>
                <button onClick={() => categorie.id && handleUpdateCategorie(categorie.id)}>Update a Categorie</button>
                <button onClick={() => categorie.id && handleGetCategorie(categorie.id)}>Get a Categorie</button>

            </div>
            )


            }


