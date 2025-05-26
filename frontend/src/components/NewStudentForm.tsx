import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

interface StudentInput {
  name: string;
  email: string;
  age: number;
}

const NewStudentForm: React.FC = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  const [newData, setNewData] = useState<StudentInput>({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevdata) => ({
      ...prevdata,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students", newData);
      alert("New Student added!!");
      navigate("/");
    } catch (error) {
      console.log("There is some error :" + error);
    }
  };
  return (
    <>
      <div className="formcontainer">
        <button onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={newData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={newData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Age: </label>
            <input
              type="number"
              name="age"
              value={newData.age}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewStudentForm;
