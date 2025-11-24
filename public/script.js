// Add Employee //
function addEmployee() {
  const data = {
    name: document.getElementById("name").value,
    department: document.getElementById("dept").value,
    age: document.getElementById("age").value,
    salary: document.getElementById("salary").value,
  };

  fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

//  Delete Employees Over Age X //
function deleteEmp() {
  const age = document.getElementById("delAge").value;

  fetch(`/api/employees/${age}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
 
// Updatept //

function updateDept() {
  const oldDept = document.getElementById("oldDept").value;
  const newDept = document.getElementById("newDept").value;

  fetch("/api/employees/department", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldDept, newDept }),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
