import "./App.css";
import NewStudentForm from "./components/NewStudentForm";
import EditStudentForm from "./components/EditStudentForm";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-student" element={<NewStudentForm />} />
      <Route path="/edit-student/:id" element={<EditStudentForm />} />
    </Routes>
  );
}

export default App;
