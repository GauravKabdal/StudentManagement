import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

interface student {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface Props {
  studentData: student[];
}

const StudentTable: React.FC<Props> = ({ studentData }) => {
  const navigate = useNavigate();

  const handleEdit = (student: student) => {
    navigate(`/edit-student/${student.id}`);
  };

  const [message, setMessage] = useState<string | null>("");
  const handleDelete = async (student: student) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${student.id}`
      );
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      navigate("/");
    } catch (error) {
      alert("There is some problem ....Check the console!!");
      console.log("Error!! :" + error);
    }
  };
  return (
    <>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentTable;
