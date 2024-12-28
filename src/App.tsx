import { Route, Routes} from "react-router-dom";
import CategoriePage from "./pages/categories.tsx";
import TaskPage from "./pages/tasks.tsx";
export default function App(){

  return(
          <Routes>
              <Route path="/" element={<CategoriePage/>} />
              <Route path="/task" element={<TaskPage/>} />
          </Routes>

  );
}