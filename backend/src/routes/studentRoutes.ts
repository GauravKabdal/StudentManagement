import express, { Request, Response } from "express";
import db from "../db";

const router = express.Router();

interface Student {
  name: string;
  email: string;
  age: number;
}

// Create
router.post("/", (req: Request, res: Response) => {
  const { name, email, age }: Student = req.body;
  const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Student created", id: (result as any).insertId });
  });
});

// Read All
router.get("/", (_req: Request, res: Response) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Read One
router.get("/:id", (req: Request, res: Response) => {
  db.query(
    "SELECT * FROM students WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json((results as any)[0]);
    }
  );
});

// Update
router.put("/:id", (req: Request, res: Response) => {
  const { name, email, age }: Student = req.body;
  const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";
  db.query(sql, [name, email, age, req.params.id], (err, _result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Student updated" });
  });
});

// Delete
router.delete("/:id", (req: Request, res: Response) => {
  db.query(
    "DELETE FROM students WHERE id = ?",
    [req.params.id],
    (err, _result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student deleted" });
    }
  );
});

export default router;
