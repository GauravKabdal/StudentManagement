import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router";

interface StudentInput {
  name: string;
  email: string;
  age: number;
}

const EditStudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from route
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<StudentInput>({
    name: "",
    email: "",
    age: 0,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );
        const { name, email, age } = response.data;
        setStudentData({ name, email, age });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, studentData);
      alert("Student updated successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      alert("Error updating student. Check the console.");
      console.error(error);
    }
  };

  return (
    <div className="formcontainer">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            type="text"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            name="age"
            type="number"
            value={studentData.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
