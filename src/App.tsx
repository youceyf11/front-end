import  { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import CategoriePage from "./pages/Category/List.tsx";
import TaskPage from "./pages/Task/List.tsx";
import CreateCategorie from "./pages/Category/Create.tsx";
import CreateTask from "./pages/Task/Create.tsx";
import UpdateTask from "./pages/Task/Update.tsx";
import UpdateCategorie from "./pages/Category/Update.tsx";
import LoginPage from "./pages/Auth/Login.tsx";
import RegisterPage from "./pages/Auth/Register.tsx";
import {Box, Container} from "@mui/material";

function App() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/data')
            .then(response => response.json())
            .then(data => setData(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            >
        <Container maxWidth="xl">
            {data ? <p>{data}</p> : <p>Loading...</p>}
            <Routes>
                <Route path="/" element={<CategoriePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/task-list" element={<TaskPage />} />
                <Route path="/categorie-list" element={<CategoriePage />} />
                <Route path={"/create-category"} element={<CreateCategorie/>} />
                <Route path={"/create-task"} element={<CreateTask />} />
                <Route path={"/update-task/:id"} element={<UpdateTask/>} />
                <Route path={"/update-categorie/:id"} element={<UpdateCategorie/>} />

            </Routes>
        </Container>
        </Box>
    );
}

export default App;