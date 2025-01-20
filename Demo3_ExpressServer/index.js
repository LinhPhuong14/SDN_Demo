const express = require("express");
//Khai bao mot so thong tin lien quan den server
const hostname = "localhost";
const port = 9000;

//Khoi tao server
//Tao danh sach student
let studentList = [
  { id: "SV01", name: "Nguyen Van A", mark: 8 },
  { id: "SV02", name: "Nguyen Van B", mark: 9 },
  { id: "SV03", name: "Nguyen Van C", mark: 7 },
];
const server = express();
server.use(express.json());
//tao GET/student method
server.get("/student", (req, res) => {
  res.status(200).send(studentList);
});
//tao POST/student method
//2b. check empty cho cac thong tin o body
//2c. Check id da ton tai thi khong add va hien thong bao
server.post("/student", (req, res) => {
  const student = req.body;
  if (!student.id || !student.name || !student.mark) {
    res.status(400).send("Missing required fields");
    return;
  } else if (studentList.find((s) => s.id === student.id)) {
    res.status(400).send("ID already exists");
    return;
  } else {
    studentList.push(student);
    res.status(201).json(student);
    res.send("Created");
  }
});
//Practice:

//3. GET /student/1: Search student by id
server.get("/student/:id", (req, res) => {
  const id = req.params.id;
  const student = studentList.find((s) => s.id === id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).send("Not found");
  }
})
//4. PUT /student/1: Update student by id
//4b.Check empty cho cac thong tin o body
//4c. Check id da ton tai thi khong add va hien thong bao
server.put("/student/:id", (req, res) => {
  const id = req.params.id;
  const student = req.body;
  if (!student.id || !student.name || !student.mark) {
    res.status(400).send("Missing required fields");
    return;
  } else if (studentList.find((s) => s.id === student.id)) {
    res.status(400).send("ID already exists");
    return;
  } else {
    const index = studentList.findIndex((s) => s.id === id);
    if (index === -1) {
      res.status(404).send("Not found");
    } else {
      studentList[index] = student;
      res.status(200).json(student);
    }
  }
})
//5. DELETE /student/1: Delete student by id
server.delete("/student/:id", (req, res) => {
  const id = req.params.id;
  const index = studentList.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).send("Not found");
  } else {
    studentList.splice(index, 1);
    res.status(200).send("Deleted");
  }
});

//Khoi tao server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
