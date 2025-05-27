import axios from "axios";

import StudentTable from "../components/StudentTable";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

function Home() {
  interface student {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  const navigate = useNavigate();

  const fetchStudents = async (): Promise<student[]> => {
    const response = await axios.get("http://localhost:5000/api/students");
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["studentTableData"],
    queryFn: fetchStudents,
  });

  if (error) return <p>There is some error!!</p>;

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <button onClick={() => navigate("/add-student")}>Add New Student</button>
      {data && <StudentTable studentData={data} />}
    </>
  );
}

export default Home;
