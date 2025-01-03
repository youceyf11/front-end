import  { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import CategoriePage from "./pages/categories.tsx";
import TaskPage from "./pages/tasks.tsx";
import TaskManager from "./component/TaskManager.tsx";
import CategorieManager from "./component/CategorieManager.tsx";

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
                <Route path="/task" element={<TaskPage />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route path="/categorie-manager" element={<CategorieManager />} />
            </Routes>
        </div>
    );
}

export default App;