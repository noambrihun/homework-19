const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://noam_userdb:Iam_noam22@noam.cyi4okn.mongodb.net/EmployeeDB")
  .then(() => console.log("✔ Connected to MongoDB"))
  .catch(err => console.log("Mongo Error:", err));

//  Schema //
const employeeSchema = mongoose.Schema({
  name: String,
  department: String,
  age: Number,
  salary: Number,
});

const Employee = mongoose.model("employees", employeeSchema);

// POST //
app.post("/api/employees", (req, res) => {
  const newEmp = new Employee(req.body);

  newEmp.save()
    .then(() => res.json({ ok: true, msg: "Employee added!" }))
    .catch(err => res.json({ ok: false, error: err }));
});

// delete //
app.delete("/api/employees/:age", (req, res) => {
  const age = req.params.age;

  Employee.deleteMany({ age: { $gt: age } })
    .then(result => res.json({ ok: true, deletedCount: result.deletedCount }))
    .catch(err => res.json({ ok: false, error: err }));
});

// put //
app.put("/api/employees/department", (req, res) => {
  const { oldDept, newDept } = req.body;

  Employee.updateMany({ department: oldDept }, { department: newDept })
    .then(result => res.json({ ok: true, modified: result.modifiedCount }))
    .catch(err => res.json({ ok: false, error: err }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
