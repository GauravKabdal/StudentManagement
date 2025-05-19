import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

interface Props {
  open: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent: {
    id: number;
    name: string;
    email: string;
    age: number;
  };
}

interface StudentInput {
  name: string;
  email: string;
  age: number;
}

const EditStudentForm: React.FC<Props> = ({
  open,
  setShowEditForm,
  selectedStudent,
}) => {
  const handleClose = () => {
    setShowEditForm(false);
  };

  const [newData, setNewData] = useState<StudentInput>(selectedStudent);

  useEffect(() => {
    setNewData({
      name: selectedStudent.name,
      email: selectedStudent.email,
      age: selectedStudent.age,
    });
  }, [selectedStudent]);

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
      await axios.put(
        `http://localhost:5000/api/students/${selectedStudent.id}`,
        newData
      );
      alert("Student edited successfully!!");
      setShowEditForm(false);
    } catch (error) {
      alert("There was some error !! Check the console!");
      console.log("There is some error :" + error);
    }
  };
  return (
    <>
      {open && (
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
      )}
    </>
  );
};

export default EditStudentForm;
