import  { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import CategoriePage from "./pages/Category/List.tsx";
import TaskPage from "./pages/Task/List.tsx";
import CreateCategorie from "./pages/Category/Create.tsx";
import CreateTask from "./pages/Task/Create.tsx";
import UpdateTask from "./pages/Task/Update.tsx";
import UpdateCategorie from "./pages/Category/Update.tsx";

function App() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/data')
            .then(response => response.json())
            .then(data => setData(data.message))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {data ? <p>{data}</p> : <p>Loading...</p>}
            <Routes>
                <Route path="/" element={<CategoriePage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/categorie-list" element={<CategoriePage />} />
                <Route path={"/create-category"} element={<CreateCategorie/>} />
                <Route path={"/create-task"} element={<CreateTask />} />
                <Route path={"/update-task"} element={<UpdateTask/>} />
                <Route path={"/update-categorie"} element={<UpdateCategorie/>} />

            </Routes>
        </div>
    );
}

export default App;