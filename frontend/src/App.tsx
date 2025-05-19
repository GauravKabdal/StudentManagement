import { useEffect, useState } from "react";
import "./App.css";
import StudentTable from "./components/StudentTable";
import axios from "axios";
import NewStudentForm from "./components/NewStudentForm";
import EditStudentForm from "./components/EditStudentForm";
function App() {
  interface student {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  const [tableData, setTableData] = useState<student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<student>({
    id: 0,
    name: "",
    email: "",
    age: 0,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await axios.get("http://localhost:5000/api/students");
        setTableData(data.data);
        console.log(data.data);
      } catch (error) {
        console.log("Cant fetch students..." + error);
      }
    };
    fetchStudents();
  }, []);
  return (
    <>
      <button onClick={() => setShowForm(true)}>Add new student</button>
      <NewStudentForm open={showForm} setShowForm={setShowForm} />
      <EditStudentForm
        open={showEditForm}
        setShowEditForm={setShowEditForm}
        selectedStudent={selectedStudent}
      />
      <StudentTable
        studentData={tableData}
        setShowEditForm={setShowEditForm}
        setSelectedStudent={setSelectedStudent}
      />
    </>
  );
}

export default App;
