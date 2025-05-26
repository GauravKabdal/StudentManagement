import axios from "axios";
import { useEffect, useState } from "react";
import StudentTable from "../components/StudentTable";
import { useNavigate } from "react-router";

function Home() {
  interface student {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  const [tableData, setTableData] = useState<student[]>([]);
  const navigate = useNavigate();

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
      <button onClick={() => navigate("/add-student")}>Add New Student</button>
      <StudentTable studentData={tableData} />
    </>
  );
}

export default Home;
